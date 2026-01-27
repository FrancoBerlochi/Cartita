"use client"

import { useEffect, useState } from "react"
import { onAuthStateChanged, signOut, User } from "firebase/auth"
import { auth } from "@/firebase/firebase"
import { Logo } from "@/components/icons/logo"
import { ThemeToggle } from "../theme-toggle"
import Link from "next/link"

export function Header() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-[#f0f2f4] dark:border-gray-800 px-4 md:px-20 lg:px-40 py-3">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo className="size-8 text-primary dark:text-[#ee8c2b]" />
          <h2 className="text-xl font-extrabold tracking-tight">Cartita</h2>
        </div>

        <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
          <nav className="flex items-center gap-8">
            <a className="text-sm font-semibold hover:text-primary transition-colors" href="#funciones">
              Funciones
            </a>
            <a className="text-sm font-semibold hover:text-primary transition-colors" href="#nosotros">
              Nosotros
            </a>
            <a className="text-sm font-semibold hover:text-primary transition-colors" href="#precios">
              Precios
            </a>
          </nav>

          <div className="flex gap-3 items-center">
            <Link
              href="/admin"
              className="flex items-center cursor-pointer bg-primary dark:bg-[#ee8c2b] text-white rounded-full h-10 px-6 text-sm font-bold hover:opacity-90 transition-opacity"
            >
              Comenzar
            </Link>

            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center h-10 cursor-pointer bg-[#f0f2f4] dark:bg-gray-800 text-[#111418] dark:text-white rounded-full px-6 text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Cerrar sesión
              </button>
            ) : (
              <Link
                href="/login"
                className="flex items-center h-10 cursor-pointer bg-[#f0f2f4] dark:bg-gray-800 text-[#111418] dark:text-white rounded-full px-6 text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Iniciar sesión
              </Link>
            )}

            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
