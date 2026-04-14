import { Box, Flex, IconButton, Text, VStack } from "@chakra-ui/react"
import { useColorMode } from "@/components/ui/color-mode"
import { Home, ListFilter, Moon, Sun } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"

export function Sidebar() {
  const { toggleColorMode, colorMode } = useColorMode()
  const location = useLocation()
  const { t } = useTranslation()

  const navItems = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/transactions", label: t("sidebar.transactions", "Transações"), icon: ListFilter },
  ]

  return (
    <Box 
      w="250px" 
      h="100vh" 
      borderRightWidth="1px" 
      bg="bg.panel"
      display={{ base: "none", md: "block" }}
    >
      <Flex direction="column" h="full" p="4">
        <Box mb="8" px="4">
          <Text fontSize="2xl" fontWeight="bold" color="blue.500" letterSpacing="tight">
            FinTrack
          </Text>
        </Box>

        <VStack align="stretch" gap="2" flex="1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            const Icon = item.icon
            return (
              <Box
                key={item.path}
              >
                <Link
                  to={item.path}
                  style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "6px", width: "100%", textDecoration: "none", color: "inherit" }}
                >
                  <Box
                    bg={isActive ? "blue.500" : "transparent"}
                    color={isActive ? "white" : "fg.muted"}
                    _hover={{
                      bg: isActive ? "blue.600" : "bg.subtle",
                    }}
                    transition="all 0.2s"
                    display="flex"
                    alignItems="center"
                    gap="3"
                    w="full"
                    p="3"
                    borderRadius="md"
                  >
                    <Icon size={20} />
                    <Text fontWeight="medium">{item.label}</Text>
                  </Box>
                </Link>
              </Box>
            )
          })}
        </VStack>

        <Box>
          <IconButton 
            aria-label="Toggle theme" 
            variant="ghost" 
            w="full" 
            justifyContent="flex-start" 
            px="4" 
            gap="3"
            onClick={toggleColorMode}
          >
            {colorMode === "light" ? <Moon size={20} /> : <Sun size={20} />}
            <Text>{colorMode === "light" ? "Modo Escuro" : "Modo Claro"}</Text>
          </IconButton>
        </Box>
      </Flex>
    </Box>
  )
}
