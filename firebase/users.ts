// firebase/users.ts
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"
import { User } from "firebase/auth"
import { db } from "./firebase"

export async function createUserIfNotExists(user: User) {
  const ref = doc(db, "users", user.uid)
  const snap = await getDoc(ref)

  if (!snap.exists()) {
    await setDoc(ref, {
      uid: user.uid,
      email: user.email,
      createdAt: serverTimestamp(),
    })
  }
}
