const features = [
  {
    icon: "link",
    title: "Perfiles de Enlaces",
    description:
      "Un enlace unificado para tu bio de Instagram, Facebook y TikTok que contiene todo lo que tu cliente necesita.",
  },
  {
    icon: "restaurant_menu",
    title: "Menús QR Digitales",
    description:
      "Menús digitales sin contacto y visualmente atractivos que los clientes pueden escanear en la mesa. Actualizaciones instantáneas, cero costos de impresión.",
  },
  {
    icon: "chat",
    title: "Integración WhatsApp",
    description:
      "Contactate directamente con tus clientes a través de WhatsApp para gestionar pedidos y reservas de manera eficiente.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 px-4 md:px-20 lg:px-40" id="funciones">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col gap-4 mb-16 items-center pb-12">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">
            Lo Que Ofrecemos
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Todo lo que necesitas para conectar digitalmente con tus clientes.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col gap-6 p-8 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 hover:shadow-xl transition-shadow group">
      <div className="size-14 rounded-full bg-primary/10 dark:bg-[#ee8c2b] flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
        <span className="material-symbols-outlined text-3xl dark:text-gray-800">{icon}</span>
      </div>
      <div>
        <h4 className="text-xl font-bold mb-3">{title}</h4>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}
