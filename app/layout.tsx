import React from "react"
import type { Metadata, Viewport } from "next"
import { Manrope } from "next/font/google"
import { ThemeProvider } from "@/app/providers/theme-provider";
import { AuthProvider } from "./providers/AuthProvider";
import { AlertProvider } from "./context/alert-context";
import "./globals.css"

const manrope = Manrope({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cartita | Presencia Digital para Restaurantes",
  description:
    "Crea perfiles de enlaces y menús interactivos para tu restaurante en minutos. Potencia tu negocio con una presencia digital móvil que convierte visitantes en clientes habituales.",
  keywords: [
    "restaurante",
    "menú digital",
    "QR",
    "link in bio",
    "gastronomía",
    "pedidos WhatsApp",
    "reservas online",
  ],
  authors: [{ name: "Cartita" }],
  openGraph: {
    title: "Cartita | Presencia Digital para Restaurantes",
    description:
      "Crea perfiles de enlaces y menús interactivos para tu restaurante en minutos.",
    type: "website",
    locale: "es_ES",
    siteName: "Cartita",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cartita | Presencia Digital para Restaurantes",
    description:
      "Crea perfiles de enlaces y menús interactivos para tu restaurante en minutos.",
  },
}

export const viewport: Viewport = {
  themeColor: "#ee8c2b",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${manrope.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AlertProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </AlertProvider>
          
        </ThemeProvider>
        {/* <Analytics /> */}
      </body>
    </html>
  )
}
