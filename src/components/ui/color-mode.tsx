// Temporário para compilar caso ui/color-mode não exista. Vou prover um mock ou baixar.
import { useTheme } from "next-themes"

export function useColorMode() {
  const { theme, setTheme } = useTheme()
  return {
    colorMode: theme,
    toggleColorMode: () => setTheme(theme === "light" ? "dark" : "light"),
  }
}
