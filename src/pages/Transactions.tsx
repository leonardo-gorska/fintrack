import { 
  Box, 
  Button, 
  Flex, 
  Heading, 
  Table, 
  Badge, 
  IconButton,
  Input,
  Field,
  Stack,
  HStack
} from "@chakra-ui/react"
import { Plus, Trash2, Search } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useTransactionStore } from "@/store/useTransactionStore"
import { useState, useMemo } from "react"
import type { Category, TransactionType } from "@/types"

export function Transactions() {
  const { t } = useTranslation()
  const { transactions, addTransaction, deleteTransaction } = useTransactionStore()
  
  const [search, setSearch] = useState("")
  const [filterType, setFilterType] = useState<TransactionType | "all">("all")
  
  const [isAddOpen, setIsAddOpen] = useState(false)
  
  // Add Transaction Form State
  const [desc, setDesc] = useState("")
  const [amount, setAmount] = useState("")
  const [type, setType] = useState<TransactionType>("expense")
  const [category, setCategory] = useState<Category>("Outros")
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const matchSearch = t.description.toLowerCase().includes(search.toLowerCase())
      const matchType = filterType === "all" ? true : t.type === filterType
      return matchSearch && matchType
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [transactions, search, filterType])

  const handleAdd = () => {
    if (!desc || !amount || !date) return
    addTransaction({
      description: desc,
      amount: parseFloat(amount),
      type,
      category,
      date
    })
    setIsAddOpen(false)
    setDesc("")
    setAmount("")
  }

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta transação?")) {
      deleteTransaction(id)
    }
  }

  const exportToCsv = () => {
    const header = "Data,Descrição,Categoria,Tipo,Valor\n"
    const csv = filteredTransactions.map(t => 
      `${t.date},"${t.description}",${t.category},${t.type === 'income' ? 'Receita' : 'Despesa'},${t.amount}`
    ).join("\n")
    
    const blob = new Blob([header + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `transacoes_fintrack_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)
  }

  const categories: Category[] = [
    "Alimentação", "Transporte", "Moradia", "Saúde", 
    "Educação", "Lazer", "Salário", "Freelance", "Outros"
  ]

  return (
    <Box>
      <Flex justify="space-between" align="center" mb="6" wrap="wrap" gap="4">
        <Heading size="2xl">{t("transactions.title", "Transações")}</Heading>
        <HStack gap="3">
          <Button variant="outline" onClick={exportToCsv}>
            Exportar CSV
          </Button>
          <Button colorPalette="blue" onClick={() => setIsAddOpen(true)}>
            <Plus size={18} />
            {t("transactions.add", "Nova Transação")}
          </Button>
        </HStack>
      </Flex>

      {/* Basic Filters */}
      <Flex mb="6" gap="4" wrap="wrap">
        <Box flex="1" minW="200px">
          <HStack gap="2">
            <Search size={20} color="gray" />
            <Input 
              placeholder={t("transactions.search", "Buscar transação...")} 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              bg="bg.panel"
            />
          </HStack>
        </Box>
        <HStack gap="2">
          <Button 
            variant={filterType === "all" ? "solid" : "outline"} 
            onClick={() => setFilterType("all")}
          >
            Todos
          </Button>
          <Button 
            variant={filterType === "income" ? "solid" : "outline"} 
            colorPalette="green"
            onClick={() => setFilterType("income")}
          >
            Receitas
          </Button>
          <Button 
            variant={filterType === "expense" ? "solid" : "outline"} 
            colorPalette="red"
            onClick={() => setFilterType("expense")}
          >
            Despesas
          </Button>
        </HStack>
      </Flex>

      {/* Table */}
      <Box overflowX="auto" bg="bg.panel" rounded="md" shadow="sm" borderWidth="1px">
        <Table.Root size="md" variant="line">
          <Table.Header>
            <Table.Row bg="bg.subtle">
              <Table.ColumnHeader>Data</Table.ColumnHeader>
              <Table.ColumnHeader>Descrição</Table.ColumnHeader>
              <Table.ColumnHeader>Categoria</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Valor</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">Ações</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filteredTransactions.length === 0 ? (
              <Table.Row>
                <Table.Cell colSpan={5} textAlign="center" py="8" color="fg.muted">
                  {t("transactions.empty", "Nenhuma transação encontrada.")}
                </Table.Cell>
              </Table.Row>
            ) : (
              filteredTransactions.map((t) => (
                <Table.Row key={t.id}>
                  <Table.Cell>
                    {new Date(t.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                  </Table.Cell>
                  <Table.Cell fontWeight="medium">{t.description}</Table.Cell>
                  <Table.Cell>
                    <Badge variant="subtle" colorPalette={t.type === 'income' ? 'green' : 'purple'}>
                      {t.category}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell textAlign="end" color={t.type === 'income' ? 'green.500' : 'red.500'} fontWeight="semibold">
                    {t.type === 'income' ? "+" : "-"}{formatCurrency(t.amount)}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <HStack justify="center" gap="2">
                      <IconButton size="xs" variant="ghost" aria-label="Delete" colorPalette="red" onClick={() => handleDelete(t.id)}>
                        <Trash2 size={16} />
                      </IconButton>
                    </HStack>
                  </Table.Cell>
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table.Root>
      </Box>

      {/* Add Dialog Overlay (Custom fallback since snippets failed) */}
      {isAddOpen && (
        <Box position="fixed" inset="0" zIndex="1000" display="flex" alignItems="center" justifyContent="center">
          <Box position="absolute" inset="0" bg="blackAlpha.600" backdropFilter="blur(4px)" onClick={() => setIsAddOpen(false)} />
          <Box position="relative" bg="bg.panel" p="6" rounded="lg" shadow="lg" w="full" maxW="md" zIndex="1001">
            <Heading size="lg" mb="4">Nova Transação</Heading>
            <Stack gap="4">
              <Field.Root>
                <Field.Label>Tipo</Field.Label>
                <HStack>
                  <Button flex="1" size="sm" variant={type === "income" ? "solid" : "outline"} colorPalette="green" onClick={() => setType("income")}>Receita</Button>
                  <Button flex="1" size="sm" variant={type === "expense" ? "solid" : "outline"} colorPalette="red" onClick={() => setType("expense")}>Despesa</Button>
                </HStack>
              </Field.Root>

              <Field.Root required>
                <Field.Label>Descrição</Field.Label>
                <Input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Ex: Mercado" />
              </Field.Root>

              <Field.Root required>
                <Field.Label>Valor (R$)</Field.Label>
                <Input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" />
              </Field.Root>

              <Field.Root>
                <Field.Label>Categoria</Field.Label>
                <select 
                  style={{ width: "100%", padding: "8px", borderWidth: "1px", borderRadius: "6px", backgroundColor: "var(--chakra-colors-bg-panel)" }} 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value as Category)}
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field.Root>

              <Field.Root required>
                <Field.Label>Data</Field.Label>
                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </Field.Root>

              <HStack justify="flex-end" mt="4">
                <Button variant="ghost" onClick={() => setIsAddOpen(false)}>Cancelar</Button>
                <Button colorPalette="blue" onClick={handleAdd}>Salvar</Button>
              </HStack>
            </Stack>
          </Box>
        </Box>
      )}
    </Box>
  )
}
