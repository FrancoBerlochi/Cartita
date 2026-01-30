"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { loginWithGoogle } from "@/firebase/auth"
import { getRestaurantByOwner } from "@/firebase/restaurants"
import HeaderLoginRegister from "@/components/layout/header-login-register"
import { registerWithEmail } from "@/firebase/auth"
import { createUserIfNotExists } from "@/firebase/users"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import {
  Building2,
  Mail,
  Lock,
  ArrowRight,
  Utensils,
  Share2,
  Star,
} from "lucide-react"

export default function SignupPage() {
  const [businessName, setBusinessName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showAlert, setShowAlert] = useState(false)
  const router = useRouter()

  const handleSignup = async () => {
  setError(null)

  if (!businessName.trim()) {
    setError("Ingresá el nombre del restaurante")
    return
  }

  if (!email.trim()) {
    setError("Ingresá un email válido")
    return
  }

  if (password.length < 6) {
    setError("La contraseña debe tener al menos 6 caracteres")
    return
  }

  try {
    setIsLoading(true)

    const res = await loginWithGoogle()
await createUserIfNotExists(res.user)

const restaurant = await getRestaurantByOwner(res.user.uid)

if (!restaurant) {
  router.replace("/onboarding")
} else {
  router.replace("/admin")
}


    // más adelante: redirect a /admin o /onboarding
  } catch (err) {
    setError((err as Error).message)
    setShowAlert(true)
    setTimeout(() => {
      setShowAlert(false)
    }, 3000);
  } finally {
    setIsLoading(false)
  }
}


  const usernamePreview = businessName
    ? `@${businessName.toLowerCase().replace(/\s+/g, "").slice(0, 15)}`
    : "@turestaurante"

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <HeaderLoginRegister />

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-10 relative overflow-hidden">
        {/* Fondo difuminado */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#ff6900]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#ff6900]/10 rounded-full blur-3xl" />
        </div>

        <Card className="relative z-10 w-full max-w-6xl p-8 md:p-12 rounded-3xl shadow-xl bg-card">
          {showAlert && (
            <div className="p-4 rounded-xl bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-100 text-sm border border-red-200 dark:border-red-800 mb-6">
              {"Ha ocurrido un error, por favor intentá nuevamente."}
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-12 items-center max-md:grid-cols-1">
            {/* FORM */}
            <div className="space-y-6 w-full">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Creá el perfil de tu restaurante
                </h1>
                <p className="text-muted-foreground">
                  Un solo link para tu menú, reservas y redes.
                </p>
              </div>

              <div className="space-y-5">
                {/* Nombre */}
                <div className="space-y-2">
                  <Label>Nombre del restaurante</Label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      placeholder="Ej: Pizzería Don Pepe"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="pl-12 h-14 rounded-xl  max-md:w-full focus-visible:ring-[#ff6900]"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label>Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      placeholder="contacto@restaurante.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 h-14 rounded-xl  max-md:w-full focus-visible:ring-[#ff6900]"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label>Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="Mínimo 6 caracteres"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-12 h-14 rounded-xl  max-md:w-full focus-visible:ring-[#ff6900]"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSignup}
                  disabled={isLoading}
                  className="w-full max-md:w-full h-14 rounded-xl max-md:ml-auto  bg-[#ff6900] hover:bg-[#ff6900]/90 text-white font-semibold shadow-lg"
                >
                  {isLoading ? "Creando perfil..." : "Crear mi perfil"}
                  {!isLoading && <ArrowRight className="ml-2 w-5 h-5" />}
                </Button>

                <p className="text-center max-md:mr-12 text-sm text-muted-foreground">
                  ¿Ya tenés cuenta?{" "}
                  <Link
                    href="/login"
                    className="text-[#ff6900] font-medium hover:underline"
                  >
                    Iniciá sesión
                  </Link>
                </p>
              </div>
            </div>

            {/* MOCKUP */}
            <div className="flex justify-center ">
              <div className="w-80 md:w-96 max-md: rounded-[2.8rem] border-4 border-[#ff6900]/20 shadow-2xl bg-card p-3">
                <div
                  className="relative rounded-[2.2rem] overflow-hidden min-h-[540px] bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5')",
                  }}
                >
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-[#000]/50 backdrop-blur-sm" />

                  <div className="relative p-6 flex flex-col items-center text-center">
                    {/* Avatar */}
                    <div className="w-20 h-20 rounded-full bg-[#ff6900] flex items-center justify-center text-3xl font-bold text-white mb-4 shadow-lg">
                      {businessName ? businessName[0].toUpperCase() : "C"}
                    </div>

                    <h3 className="text-xl font-semibold text-white">
                      {businessName || "Tu Restaurante"}
                    </h3>
                    <p className="text-sm text-[#f7ad78] font-medium">
                      {usernamePreview}
                    </p>

                    <div className="w-full mt-6 space-y-3">
                      <button className="w-full py-3 rounded-xl bg-[#ff6900] text-white font-medium shadow">
                        Ver menú
                      </button>
                      <button className="w-full py-3 rounded-xl bg-white/80 text-[#ff6900] font-medium">
                        Reservar mesa
                      </button>
                      <button className="w-full py-3 rounded-xl bg-white/80 text-[#ff6900] font-medium">
                        Instagram
                      </button>
                    </div>

                    <div className="flex gap-4 mt-6">
                      <Share2 className="w-5 h-5 text-white" />
                      <Star className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center bg-card border-t">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Cartita. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}
