"use client"

import { useState, useEffect } from "react"
import { postLoginRedirect } from "@/lib/postLoginRedirect"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Utensils, AlertCircle } from "lucide-react"
import { loginWithEmail, loginWithGoogle } from "@/firebase/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import HeaderLoginRegister from "@/components/layout/header-login-register"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [keepLoggedIn, setKeepLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleEmailLogin = async () => {
  setError(null)
  setIsLoading(true)

  try {
    const res = await loginWithEmail(email, password)
    await postLoginRedirect(res.user, router)
  } catch (err) {
    setError((err as Error).message)
    setIsLoading(false)
  }
}

const handleGoogleLogin = async () => {
  setError(null)
  setIsLoading(true)

  try {
    const res = await loginWithGoogle()
    await postLoginRedirect(res.user, router)
  } catch (err) {
    setError((err as Error).message)
    setIsLoading(false)
  }
}



//   useEffect(() => {
//   const unsubscribe = onAuthStateChanged(auth, (user) => {
//     if (user) {
//       router.replace("/admin")
//     }
//   })

//   return () => unsubscribe()
// }, [router])


  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <HeaderLoginRegister />

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-10 relative overflow-hidden">

        {/* Card */}
        <div className="w-full max-w-md bg-card rounded-3xl shadow-xl shadow-[#ff6900]/10 p-8 relative z-10">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#ff6900]/10 rounded-2xl flex items-center justify-center">
              <Utensils className="w-8 h-8 text-[#ff6900]" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Bienvenido a Cartita
            </h1>
            <p className="text-muted-foreground">
              Gestioná tu menú digital y presencia online.
            </p>
          </div>

          <div className="space-y-5">
            {error && (
              <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 rounded-xl">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                <p className="text-sm text-red-700 dark:text-red-300">
                  {"Ha ocurrido un error, por favor intentá nuevamente."}
                </p>
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@restaurante.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-xl focus-visible:ring-[#ff6900]"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-xl pr-12 focus-visible:ring-[#ff6900]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[#ff6900]"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* Keep logged */}
            <div className="flex items-center gap-3">
              <Checkbox
                id="keep-logged"
                checked={keepLoggedIn}
                onCheckedChange={(v) => setKeepLoggedIn(Boolean(v))}
                className="data-[state=checked]:bg-[#ff6900] data-[state=checked]:border-[#ff6900]"
              />
              <Label
                htmlFor="keep-logged"
                className="text-sm text-muted-foreground cursor-pointer"
              >
                Mantener sesión iniciada
              </Label>
            </div>

            {/* Login */}
            <Button
              onClick={handleEmailLogin}
              disabled={isLoading}
              className="w-full h-12 rounded-xl font-semibold bg-[#ff6900] hover:bg-[#ff6900]/90 text-white shadow-lg shadow-[#ff6900]/30"
            >
              {isLoading ? "Ingresando..." : "Ingresar"}
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-muted-foreground text-sm">
                O continuá con
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Google */}
            <Button
              variant="outline"
              onClick={handleGoogleLogin}
              className="w-full h-12 rounded-xl bg-transparent border-[#ff6900]/40 hover:bg-[#ff6900]/10"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </Button>

            <p className="text-center text-sm text-muted-foreground pt-4">
              ¿No tenés cuenta?{" "}
              <Link href="/register" className="text-[#ff6900] hover:underline font-medium">
               Creá una gratis
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 bg-card border-t">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Cartita. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  )
}
