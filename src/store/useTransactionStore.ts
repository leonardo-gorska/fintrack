import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Transaction } from "@/types"

const DEMO_TRANSACTIONS: Transaction[] = [
  { id: "d1", description: "Salário - Freelance Front-End", amount: 3200, date: "2026-05-01", type: "income", category: "Freelance", createdAt: 1 },
  { id: "d2", description: "Aluguel", amount: 1200, date: "2026-05-05", type: "expense", category: "Moradia", createdAt: 2 },
  { id: "d3", description: "Supermercado Atacadão", amount: 487.50, date: "2026-05-03", type: "expense", category: "Alimentação", createdAt: 3 },
  { id: "d4", description: "Uber + Metrô", amount: 156, date: "2026-05-02", type: "expense", category: "Transporte", createdAt: 4 },
  { id: "d5", description: "Curso Udemy - Spring Boot", amount: 29.90, date: "2026-04-28", type: "expense", category: "Educação", createdAt: 5 },
  { id: "d6", description: "Salário - Freelance Front-End", amount: 3200, date: "2026-04-01", type: "income", category: "Freelance", createdAt: 6 },
  { id: "d7", description: "Aluguel Abril", amount: 1200, date: "2026-04-05", type: "expense", category: "Moradia", createdAt: 7 },
  { id: "d8", description: "Farmácia", amount: 89, date: "2026-04-10", type: "expense", category: "Saúde", createdAt: 8 },
  { id: "d9", description: "Cinema + Pizza", amount: 95, date: "2026-04-15", type: "expense", category: "Lazer", createdAt: 9 },
  { id: "d10", description: "Venda Bot Telegram", amount: 500, date: "2026-04-20", type: "income", category: "Freelance", createdAt: 10 },
  { id: "d11", description: "Internet + Luz", amount: 280, date: "2026-03-10", type: "expense", category: "Moradia", createdAt: 11 },
  { id: "d12", description: "Salário - Freelance Front-End", amount: 3200, date: "2026-03-01", type: "income", category: "Freelance", createdAt: 12 },
]

interface TransactionState {
  transactions: Transaction[]
  addTransaction: (data: Omit<Transaction, "id" | "createdAt">) => void
  editTransaction: (id: string, data: Partial<Omit<Transaction, "id" | "createdAt">>) => void
  deleteTransaction: (id: string) => void
}

export const useTransactionStore = create<TransactionState>()(
  persist(
    (set) => ({
      transactions: DEMO_TRANSACTIONS,
      addTransaction: (data) => 
        set((state) => ({
          transactions: [
            ...state.transactions,
            { ...data, id: crypto.randomUUID(), createdAt: Date.now() },
          ],
        })),
      editTransaction: (id, data) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...data } : t
          ),
        })),
      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),
    }),
    {
      name: "fintrack-storage",
    }
  )
)
