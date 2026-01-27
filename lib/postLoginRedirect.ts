import { User } from "firebase/auth"
import { getRestaurantByOwner } from "@/firebase/restaurants"
import { createUserIfNotExists } from "@/firebase/users"
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

export async function postLoginRedirect(
  user: User,
  router: AppRouterInstance
) {
  try {
    console.log("postLoginRedirect user:", user.uid)

    await createUserIfNotExists(user)
    console.log("user ensured")

    const restaurant = await getRestaurantByOwner(user.uid)
    console.log("restaurant:", restaurant)

    if (!restaurant) {
      router.replace("/onboarding")
    } else {
      router.replace("/admin")
    }
  } catch (err) {
    console.error("postLoginRedirect error:", err)
    router.replace("/onboarding") // fallback seguro
  }
}
