"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getRestaurantByOwner } from "@/firebase/restaurants"
import { useAuth } from "@/app/providers/AuthProvider"

export default function OnboardingPage() {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (loading) return
    if (!user) {
      router.replace("/login")
      return
    }

    getRestaurantByOwner(user.uid).then((restaurant) => {
      if (!restaurant) {
        router.replace("/onboarding/restaurant")
        return
      }

      switch (restaurant.onboardingStep) {
        case "RESTAURANT":
          router.replace("/onboarding/restaurant")
          break
        case "MENU":
          router.replace("/onboarding/menu")
          break
        case "DONE":
          router.replace("/admin")
          break
        default:
          router.replace("/onboarding/restaurant")
      }
    })
  }, [user, loading, router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-lg">Redirigiendo...</p>
    </div>
    )
}
