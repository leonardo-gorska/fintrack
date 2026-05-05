import { Box, Flex, Heading, SimpleGrid, Text, HStack, Card } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import { useTransactionStore } from "@/store/useTransactionStore"
import { useMemo } from "react"
import { 
  BarChart, Bar, 
  LineChart, Line, 
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from "recharts"
import { ArrowDownRight, ArrowUpRight, Wallet } from "lucide-react"

export function Dashboard() {
  const { t } = useTranslation()
  const { transactions } = useTransactionStore()

  const { totalIncomes, totalExpenses, balance } = useMemo(() => {
    let income = 0
    let expense = 0
    transactions.forEach(t => {
      if (t.type === "income") income += t.amount
      else expense += t.amount
    })
    return { totalIncomes: income, totalExpenses: expense, balance: income - expense }
  }, [transactions])

  const categoryData = useMemo(() => {
    const expenses = transactions.filter(t => t.type === "expense")
    const map = new Map<string, number>()
    expenses.forEach(t => {
      map.set(t.category, (map.get(t.category) || 0) + t.amount)
    })
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }))
  }, [transactions])

  const monthlyData = useMemo(() => {
    const map = new Map<string, { income: number, expense: number }>()
    transactions.forEach(t => {
      const month = t.date.substring(0, 7) // YYYY-MM
      if (!map.has(month)) map.set(month, { income: 0, expense: 0 })
      const val = map.get(month)!
      if (t.type === "income") val.income += t.amount
      else val.expense += t.amount
    })
    return Array.from(map.entries())
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(-6) // last 6 months
  }, [transactions])

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#ffc658', '#a4de6c']

  return (
    <Box>
      <Heading size="2xl" mb="6">{t("dashboard.title", "Visão Geral")}</Heading>

      {/* Summary Cards */}
      <SimpleGrid columns={{ base: 1, md: 3 }} gap="6" mb="8">
        <Card.Root>
          <Card.Body>
            <HStack justify="space-between" mb="2">
              <Text color="fg.muted" fontWeight="medium">{t("dashboard.totalBalance", "Saldo Total")}</Text>
              <Wallet size={20} color="gray" />
            </HStack>
            <Heading size="3xl" color={balance >= 0 ? "green.500" : "red.500"}>
              {formatCurrency(balance)}
            </Heading>
          </Card.Body>
        </Card.Root>

        <Card.Root bg="bg.panel">
          <Card.Body>
            <HStack justify="space-between" mb="2">
              <Text color="fg.muted" fontWeight="medium">{t("dashboard.income", "Receitas")}</Text>
              <ArrowUpRight size={20} color="green" />
            </HStack>
            <Heading size="2xl" color="green.500">
              {formatCurrency(totalIncomes)}
            </Heading>
          </Card.Body>
        </Card.Root>

        <Card.Root bg="bg.panel">
          <Card.Body>
            <HStack justify="space-between" mb="2">
              <Text color="fg.muted" fontWeight="medium">{t("dashboard.expense", "Despesas")}</Text>
              <ArrowDownRight size={20} color="red" />
            </HStack>
            <Heading size="2xl" color="red.500">
              {formatCurrency(totalExpenses)}
            </Heading>
          </Card.Body>
        </Card.Root>
      </SimpleGrid>

      {/* Charts Grid */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap="6">
        <Card.Root>
          <Card.Body>
            <Heading size="md" mb="4">Evolução de Receitas vs Despesas</Heading>
            <Box h="300px" w="full">
              <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} tickFormatter={(val) => `R$${val}`} />
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Legend />
                  <Line type="monotone" name="Receita" dataKey="income" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" name="Despesa" dataKey="expense" stroke="#ef4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Card.Body>
        </Card.Root>

        <Card.Root>
          <Card.Body>
            <Heading size="md" mb="4">Comparativo Mensal</Heading>
            <Box h="300px" w="full">
              <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} tickFormatter={(val) => `R$${val}`} />
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Legend />
                  <Bar dataKey="income" name="Receita" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expense" name="Despesa" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Card.Body>
        </Card.Root>

        <Card.Root gridColumn={{ lg: "span 2" }}>
          <Card.Body>
            <Heading size="md" mb="4">Despesas por Categoria</Heading>
            <Box h="300px" w="full">
              {categoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      label={({name, percent}) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <Flex h="full" w="full" align="center" justify="center" color="fg.muted">
                  Nenhuma despesa registrada.
                </Flex>
              )}
            </Box>
          </Card.Body>
        </Card.Root>
      </SimpleGrid>
    </Box>
  )
}
