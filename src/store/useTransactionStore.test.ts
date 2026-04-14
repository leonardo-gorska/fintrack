import { describe, it, expect, beforeEach } from "vitest"
import { useTransactionStore } from "./useTransactionStore"

describe("useTransactionStore", () => {
  beforeEach(() => {
    // Reset state before each test
    useTransactionStore.setState({ transactions: [] })
  })

  it("should add a transaction", () => {
    const store = useTransactionStore.getState()
    store.addTransaction({
      description: "Test",
      amount: 100,
      type: "income",
      category: "Salário",
      date: "2026-04-14"
    })

    const updatedStore = useTransactionStore.getState()
    expect(updatedStore.transactions).toHaveLength(1)
    expect(updatedStore.transactions[0].description).toBe("Test")
  })

  it("should delete a transaction", () => {
    const store = useTransactionStore.getState()
    store.addTransaction({
      description: "To Delete",
      amount: 50,
      type: "expense",
      category: "Alimentação",
      date: "2026-04-14"
    })

    const stateWithItem = useTransactionStore.getState()
    const id = stateWithItem.transactions[0].id

    stateWithItem.deleteTransaction(id)
    const emptyState = useTransactionStore.getState()
    
    expect(emptyState.transactions).toHaveLength(0)
  })
})
