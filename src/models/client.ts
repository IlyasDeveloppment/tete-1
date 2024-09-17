export interface Client {
  name: string
  email: string
  phone?: string
  address?: Record<string, any>
  birthDate?: Date
  tags?: any
  active?: boolean
  score?: number
  preferences?: Record<string, any>
  lastLogin?: Date
  notes?: any
}
