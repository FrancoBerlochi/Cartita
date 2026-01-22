import { Logo } from "@/components/icons/logo"
import { ThemeToggle } from "../theme-toggle"

const navLinks = [
    { label: "Funciones", href: "#funciones" },
    { label: "Nosotros", href: "#nosotros" },
    { label: "Precios", href: "#precios" },
]

export function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-[#f0f2f4] dark:border-gray-800 px-4 md:px-20 lg:px-40 py-3">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo className="size-8 text-primary dark:text-[#ee8c2b]" />
          <h2 className="text-xl font-extrabold tracking-tight">Cartita</h2>
        </div>
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
          <div className="flex gap-3">
            <button className="cursor-pointer bg-primary dark:bg-[#ee8c2b] text-white rounded-full h-10 px-6 text-sm font-bold hover:opacity-90 transition-opacity">
              Comenzar
            </button>
            <button className="cursor-pointer bg-[#f0f2f4] dark:bg-gray-800 text-[#111418] dark:text-white rounded-full h-10 px-6 text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              Iniciar Sesión
            </button>
        <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
