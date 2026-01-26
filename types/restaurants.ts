export interface Restaurant {
  id: string
  ownerId: string

  name: string
  description?: string
  logoUrl?: string

  location?: {
    address: string
    city?: string
    lat?: number
    lng?: number
  }

  contact?: {
    phone?: string
    email?: string
    whatsapp?: string
  }

  hours?: {
    [day: string]: {
      open: string
      close: string
    }
  }

  createdAt: Date
  updatedAt?: Date
}
