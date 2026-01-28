import {
  collection,
  getDocs,
  query,
  addDoc,
  where,
  writeBatch,
  serverTimestamp,
  doc
} from "firebase/firestore"
import { db } from "@/firebase/firebase"
import { MenuCategory } from "@/types/menu"
const normalize = (name: string) =>
  name.trim().toLowerCase()

const DEFAULT_CATEGORIES = [
  "Entradas",
  "Platos Principales",
  "Guarniciones",
  "Bebidas",
  "Postres",
]

export async function seedDefaultCategories(ownerId: string) {
  const q = query(
    collection(db, "menuCategories"),
    where("ownerId", "==", ownerId),
  )

  const snap = await getDocs(q)
  if (!snap.empty) return // 👈 evita duplicados

  const batch = writeBatch(db)

  DEFAULT_CATEGORIES.forEach(name => {
    const ref = doc(collection(db, "menuCategories"))
    batch.set(ref, {
      ownerId,
      name,
      nameNormalized: normalize(name),
      createdAt: serverTimestamp(),
    })
  })

  await batch.commit()
}



export async function getMenuCategories(ownerId: string) {
  const q = query(
    collection(db, "menuCategories"),
    where("ownerId", "==", ownerId),
  )

  const snap = await getDocs(q)

  const categories = await Promise.all(
    snap.docs.map(async (docSnap) => {
      const itemsSnap = await getDocs(
        query(
          collection(db, "menuItems"),
          where("categoryId", "==", docSnap.id),
        ),
      )

      return {
        id: docSnap.id,
        name: docSnap.data().name,
        items: itemsSnap.docs.map((i) => ({
          id: i.id,
          ...i.data(),
        })),
      }
    }),
  )

  return categories
}




export async function createMenuCategory(
  ownerId: string,
  name: string,
) {
  const normalized = normalize(name)

  const q = query(
    collection(db, "menuCategories"),
    where("ownerId", "==", ownerId),
    where("nameNormalized", "==", normalized),
  )

  const exists = await getDocs(q)
  if (!exists.empty) {
    throw new Error("CATEGORY_EXISTS")
  }

  return await addDoc(collection(db, "menuCategories"), {
    ownerId,
    name,
    nameNormalized: normalized,
    createdAt: serverTimestamp(),
  })
}


export async function addItemsToCategory(
  ownerId: string,
  categoryId: string,
  items: {
    name: string
    price: number | null
    noPrice: boolean
  }[],
) {
  const batch = writeBatch(db)

  items.forEach((item) => {
    const ref = doc(collection(db, "menuItems"))
    batch.set(ref, {
      ownerId,
      categoryId,
      ...item,
      createdAt: serverTimestamp(),
    })
  })

  await batch.commit()
}

