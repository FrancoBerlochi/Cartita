import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from "./firebase"

export async function createRestaurant(ownerId: string, name: string) {
  const ref = doc(db, "restaurants", ownerId)

  await setDoc(ref, {
    ownerId,
    name,
    createdAt: serverTimestamp(),
    onboardingStep: "BASIC_INFO",
    plan: null,
    isActive: false,
  })
}

export async function getRestaurantByOwner(ownerId: string) {
  const ref = doc(db, "restaurants", ownerId)
  const snap = await getDoc(ref)

  return snap.exists() ? snap.data() : null
}
