"use client";

import { Instagram, Facebook } from "lucide-react";
import { useState } from "react";

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/cartita" },
  { label: "Facebook", href: "https://facebook.com/cartita" },
];

export function HeroSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-16 xl:px-24 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* TEXTO */}
          <div className="flex flex-col gap-8 text-center lg:text-left">
            <span className="self-center lg:self-start bg-orange-500 text-orange-50 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
              Gastronomía Digital
            </span>

            <h1
              className="font-black leading-tight text-balance
              text-[clamp(2rem,6vw,3.75rem)]
            "
            >
              La Puerta Digital <br className="hidden sm:block" />
              de Tu Restaurante
            </h1>

            <p
              className="text-gray-400 max-w-prose mx-auto lg:mx-0
              text-[clamp(0.95rem,2.5vw,1.05rem)]
            "
            >
              Crea perfiles de enlaces y menús interactivos en minutos. Potencia
              tu negocio con una presencia digital móvil que convierte
              visitantes en clientes habituales.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 py-4 font-bold transition hover:scale-105">
                Prueba Gratis
              </button>
              <button className="bg-white/10 border border-white/20 text-white rounded-full px-8 py-4 font-bold hover:bg-white/20 transition">
                Ver Demo
              </button>
            </div>
          </div>

          {/* MOCKUP */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
              <PhoneMockup />

              {/* QR flotante */}
              <div
                className="
                hidden md:block
                absolute
                bottom-[6%]
                right-[6%]
                min-[1240px]:max-[1599px]:bottom-[-1%]
                min-[1240px]:max-[1599px]:right-[0%]
                bg-white
                p-4
                rounded-xl
                shadow-xl
              "
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 aspect-square bg-green-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 5h4v4H5zM15 5h4v4h-4zM5 15h4v4H5zM15 15h2v2h-2zM9 9h6v6H9z"
                      />
                    </svg>
                  </div>

                  <div className="">
                    <p className="text-sm font-bold text-gray-900">Código QR</p>
                    <p className="text-xs text-gray-500">Escaneá el menú</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhoneMockup() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className="
      relative
      w-[75%]
      aspect-[9/19]
      min-[1240px]:max-[1599px]:w-[65%]
      max-h-[80vh]
      bg-[hsl(220,49%,15%)]
      dark:bg-[hsl(220,49%,8%)]
      rounded-[2.5rem]
      border-[0.75rem]
      border-neutral-900
      shadow-2xl
      overflow-hidden
      mx-auto
    "
    >
      {/* Island */}
      <div
        className="
        absolute
        top-[2%]
        left-1/2
        -translate-x-1/2
        w-[35%]
        h-[4%]
        bg-black
        rounded-full
        z-10
      "
      />

      {/* Banner */}
      <div className="relative h-[26%]">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div
        className="
        relative
        -mt-[14%]
        px-6
        pb-6
        flex
        flex-col
        items-center
        h-full
      "
      >
        <img
          src="https://images.unsplash.com/photo-1578474846511-04ba529f0b88"
          className="
            w-[28%]
            aspect-square
            rounded-full
            border-4
            border-[#0b1220]
            object-cover
          "
        />

        <h3 className="mt-4 font-bold text-white text-center text-sm sm:text-base">
          La Cocina Artesanal
        </h3>

        <p className="text-xs text-gray-400 mb-4 text-center">
          Italiana • Moderna • Brunch
        </p>

        <div className="w-full flex flex-col gap-3 mt-10">
          {["VER MENÚ", "RESERVAR MESA", "PEDIR POR WHATSAPP"].map((txt) => (
            <button
              key={txt}
              onClick={() => setActive(txt)}
              className={`
                py-3 rounded-xl text-sm font-bold transition
                ${
                  active === txt
                    ? "bg-orange-600 text-white scale-95"
                    : "bg-white text-black"
                }
              `}
            >
              {txt}
            </button>
          ))}
        </div>

        <div className="flex gap-3 mt-5">
          {socialLinks.map((social) => {
            const Icon = social.label === "Instagram" ? Instagram : Facebook;
            return (
              <a
                key={social.label}
                className="
                  w-10 aspect-square
                  rounded-full
                  bg-gray-100
                  dark:bg-gray-800
                  flex items-center justify-center
                  hover:bg-orange-500
                  hover:text-white
                  transition
                  text-gray-400
                "
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
