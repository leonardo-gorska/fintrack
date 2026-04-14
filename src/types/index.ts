export type TransactionType = "income" | "expense"

export type Category = 
  | "Alimentação" 
  | "Transporte" 
  | "Moradia" 
  | "Saúde" 
  | "Educação" 
  | "Lazer" 
  | "Salário" 
  | "Freelance" 
  | "Outros"

export interface Transaction {
  id: string
  description: string
  amount: number
  date: string // ISO string format YYYY-MM-DD
  type: TransactionType
  category: Category
  createdAt: number
}
