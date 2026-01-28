"use client"

import { useEffect, useState } from "react"
import { onAuthStateChanged, signOut, User } from "firebase/auth"
import { auth } from "@/firebase/firebase"
import { Logo } from "@/components/icons/logo"
import { ThemeToggle } from "../theme-toggle"
import Link from "next/link"


const navNames = [
  { href: "#", name: "INICIO" },
  { href: "#funciones", name: "FUNCIONES" },
  { href: "#nosotros", name: "NOSOTROS" },
  { href: "#precios", name: "PRECIOS" },
];
export function Header() {
  const [user, setUser] = useState<User | null>(null)
  const [menu, setMenu] = useState(true)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

    useEffect(() => {
      document.body.classList.toggle("no-scroll", menu);
      return () => document.body.classList.remove("no-scroll");
    }, [menu]);

  const handleLogout = async () => {
    await signOut(auth)
  }

  const handleMenu = () => setMenu(!menu)

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-[#f0f2f4] dark:border-gray-800 px-4 md:px-20 lg:px-40 py-3">
      <div className="w-full mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo className="size-8 text-primary dark:text-[#ee8c2b]" />
          <h2 className="text-xl font-extrabold tracking-tight">Cartita</h2>
        </div>
        <button className="hidden max-md:block" onClick={handleMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            className="lucide lucide-menu-icon lucide-menu"
            viewBox="0 0 24 24"
          >
            <path d="M4 5h16M4 12h16M4 19h16" />
          </svg>
        </button>
        <nav
          className={`${
            menu
              ? `max-md:h-screen max-md:flex max-md:flex-col`
              : `h-screen w-0 translate-x-[100vw]`
          } z-30 fixed bg-[#e1488c] dark:bg-background-dark transition-all duration-300 w-screen top-0 bottom-0 left-0`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full flex justify-between items-center">
            <button
              className={`${
                menu
                  ? `w-fit h-fit ml-auto mr-4 mt-4`
                  : `w-fit h-fit ml-auto mr-4 mt-4`
              } text-[#fee] dark:text-primary`}
              onClick={handleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-menu-icon lucide-menu"
              >
                <path d="M4 5h16" />
                <path d="M4 12h16" />
                <path d="M4 19h16" />
              </svg>
            </button>
          </div>
          <div
            className={`flex flex-col items-left ml-8 gap-16 mt-[13vh] mb-[55vh] transition-all duration-300 ${
              menu ? `text-5xl` : `text-5xl`
            } text-[#fee] dark:text-white`}
          >
            {navNames.map((n, index) => {
              return (
                <a
                  key={n.href}
                  href={n.href}
                  className="flex"
                  onClick={handleMenu}
                >
                  {n.name}
                  <span className="text-[16px] ml-4 mt-4">
                    <span className="text-primary">0{index + 1}</span>
                  </span>
                </a>
              );
            })}
          </div>
        </nav>

        <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
          <nav className="flex items-center gap-8">
            <a
              className="text-sm font-semibold hover:text-primary transition-colors"
              href="#funciones"
            >
              Funciones
            </a>
            <a
              className="text-sm font-semibold hover:text-primary transition-colors"
              href="#nosotros"
            >
              Nosotros
            </a>
            <a
              className="text-sm font-semibold hover:text-primary transition-colors"
              href="#precios"
            >
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
  );
}
