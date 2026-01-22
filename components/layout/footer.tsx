import { Logo } from "@/components/icons/logo"
import { Instagram, Facebook } from "lucide-react"

const platformLinks = [
  { label: "Funciones", href: "#funciones" },
  { label: "Plantillas", href: "#" },
  { label: "Generador QR", href: "#" },
  { label: "Integraciones", href: "#" },
]

const companyLinks = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Blog", href: "#" },
  { label: "Contacto", href: "#" },
]

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/cartita",
    icon: Instagram,
  },
  {
    label: "Facebook",
    href: "https://facebook.com/cartita",
    icon: Facebook,
  },
]

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900/80 border-t border-gray-100 dark:border-gray-800 pt-20 pb-10 px-4 md:px-20 lg:px-40">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Logo className="size-6 text-primary dark:text-[#ee8c2b]" />
              <h2 className="text-xl font-extrabold tracking-tight dark:text-white">
                Cartita
              </h2>
            </div>
            <p className="text-gray-500 dark:text-gray-400 max-w-[300px] text-sm leading-relaxed mb-8">
              Impulsando el futuro de la gastronomía a través de soluciones
              digitales móviles. Únete a la revolución restaurantera hoy.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    className="size-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-primary dark:hover:bg-[#ee8c2b] hover:text-white transition-colors text-gray-600 dark:text-gray-400"
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon size={20} />
                  </a>
                )
              })}
            </div>
          </div>
          <div>
            <h5 className="font-bold text-sm mb-6 uppercase tracking-widest dark:text-white">
              Plataforma
            </h5>
            <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <a
                    className="hover:text-primary dark:hover:text-[#ee8c2b] transition-colors"
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-sm mb-6 uppercase tracking-widest dark:text-white">
              Empresa
            </h5>
            <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    className="hover:text-primary dark:hover:text-[#ee8c2b] transition-colors"
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-10 border-t border-gray-100 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Cartita Inc. Todos los derechos reservados.
          </p>
          <div className="flex gap-8 text-xs text-gray-500 dark:text-gray-400">
            <a className="hover:text-primary dark:hover:text-[#ee8c2b]" href="#">
              Política de Privacidad
            </a>
            <a className="hover:text-primary dark:hover:text-[#ee8c2b]" href="#">
              Términos de Servicio
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}