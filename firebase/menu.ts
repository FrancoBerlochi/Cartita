import {
  collection,
  getDocs,
  doc,
  addDoc,
} from "firebase/firestore"
import { db } from "@/firebase/firebase"
import { MenuCategory } from "@/types/menu"
import { serverTimestamp } from "firebase/firestore"

export async function getMenuCategories(
  ownerId: string,
): Promise<MenuCategory[]> {
  const categoriesRef = collection(
    db,
    "restaurants",
    ownerId,
    "menuCategories",
  )

  const snapshot = await getDocs(categoriesRef)

  const categories: MenuCategory[] = []

  for (const docSnap of snapshot.docs) {
    const data = docSnap.data()

    const itemsSnap = await getDocs(
      collection(
        db,
        "restaurants",
        ownerId,
        "menuCategories",
        docSnap.id,
        "items",
      ),
    )

    const items = itemsSnap.docs.map((item) => ({
      id: item.id,
      name: item.data().name,
      price: item.data().price ?? null,
      noPrice: item.data().noPrice,
    }))

    categories.push({
      id: docSnap.id,
      name: data.name,
      items,
    })
  }

  return categories
}

export async function createMenuCategory(
  ownerId: string,
  category: {
    name: string
    items: {
      name: string
      price: number | null
      noPrice: boolean
    }[]
  },
) {
  const categoryRef = await addDoc(
    collection(db, "restaurants", ownerId, "menuCategories"),
    {
      name: category.name,
      createdAt: serverTimestamp(),
    },
  )

  for (const item of category.items) {
    await addDoc(
      collection(
        db,
        "restaurants",
        ownerId,
        "menuCategories",
        categoryRef.id,
        "items",
      ),
      item,
    )
  }
}

