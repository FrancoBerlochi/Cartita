import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore"
import { db } from "./firebase"

export async function createRestaurant(
  ownerId: string,
  data: {
    name: string
    businessType: string | null
    city: string | null
  }
) {
  const ref = doc(db, "restaurants", ownerId)

  await setDoc(ref, {
    ownerId,
    name: data.name,
    businessType: data.businessType,
    city: data.city,
    createdAt: serverTimestamp(),
    onboardingStep: "MENU",
    plan: null,
    isActive: false,
  })
}


export async function getRestaurantByOwner(ownerId: string) {
  const ref = doc(db, "restaurants", ownerId)
  const snap = await getDoc(ref)

  return snap.exists() ? snap.data() : null
}
