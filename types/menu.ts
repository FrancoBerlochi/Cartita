export interface MenuItem {
  id: string
  name: string
  price: number | null
  noPrice: boolean
}

export interface MenuCategory {
  id: string
  name: string
  items: MenuItem[]
}
