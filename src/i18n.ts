import i18n from "i18next"
import { initReactI18next } from "react-i18next"

const resources = {
  pt: {
    translation: {
      sidebar: {
        dashboard: "Dashboard",
        transactions: "Transações"
      },
      dashboard: {
        title: "Visão Geral",
        totalBalance: "Saldo Total",
        income: "Receitas",
        expense: "Despesas",
      },
      transactions: {
        title: "Transações",
        add: "Nova Transação",
        search: "Buscar transação...",
        empty: "Nenhuma transação encontrada",
      }
    }
  },
  en: {
    translation: {
      sidebar: {
        dashboard: "Dashboard",
        transactions: "Transactions"
      },
      dashboard: {
        title: "Overview",
        totalBalance: "Net Balance",
        income: "Incomes",
        expense: "Expenses",
      },
      transactions: {
        title: "Transactions",
        add: "New Transaction",
        search: "Search transaction...",
        empty: "No transactions found",
      }
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "pt", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    }
  })

export default i18n
