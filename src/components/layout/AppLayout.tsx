import { Box, Flex } from "@chakra-ui/react"
import type { ReactNode } from "react"
import { Sidebar } from "./Sidebar"

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <Flex h="100vh" w="100vw" overflow="hidden" bg="bg.base">
      <Sidebar />
      <Box flex="1" overflowY="auto" as="main" p={{ base: 4, md: 8 }}>
        <Box maxW="6xl" mx="auto">
          {children}
        </Box>
      </Box>
    </Flex>
  )
}
