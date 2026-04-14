import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Transaction } from "@/types"

interface TransactionState {
  transactions: Transaction[]
  addTransaction: (data: Omit<Transaction, "id" | "createdAt">) => void
  editTransaction: (id: string, data: Partial<Omit<Transaction, "id" | "createdAt">>) => void
  deleteTransaction: (id: string) => void
}

export const useTransactionStore = create<TransactionState>()(
  persist(
    (set) => ({
      transactions: [],
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
