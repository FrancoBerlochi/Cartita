const basicFeatures = [
  { text: "1 Perfil y Menú", included: true },
  { text: "Menú Digital Estándar", included: true },
  { text: "Código QR Estático", included: true },
  { text: "Dominio Personalizado", included: false },
]

const proFeatures = [
  { text: "Dominio Personalizado (cartita.tunombre.com)", included: true },
  { text: "Contacto via WhatsApp", included: true },
  { text: "Código QR Dinámico y descarga de PDF", included: true },
  { text: "Soporte Prioritario 24/7", included: true },
]

export function PricingSection() {
  return (
    <section
      className="bg-gray-100 dark:bg-gray-900/80 py-24 px-4 md:px-20 lg:px-40"
      id="precios"
    >
      <div className="max-w-[1200px] mx-auto text-center">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Precios Simples y Transparentes
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Elegí el plan que se adapte a la etapa de tu restaurante.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px] mx-auto">
          <PricingCard
            name="Básico"
            description="Perfecto para empezar"
            price="$8500"
            features={basicFeatures}
            buttonText="Comenzar"
            highlighted={false}
          />
          <PricingCard
            name="Pro"
            description="Todo lo que necesitás para crecer"
            price="$15000"
            features={proFeatures}
            buttonText="Iniciar Prueba Pro"
            highlighted={true}
          />
        </div>
      </div>
    </section>
  )
}

function PricingCard({
  name,
  description,
  price,
  features,
  buttonText,
  highlighted,
}: {
  name: string
  description: string
  price: string
  features: { text: string; included: boolean }[]
  buttonText: string
  highlighted: boolean
}) {
  return (
    <div
      className={`bg-white dark:bg-gray-900 p-10 rounded-lg flex flex-col items-center relative ${
        highlighted
          ? "shadow-2xl border-2 border-primary dark:border-[#ee8c2b]"
          : "shadow-sm border border-gray-200 dark:border-gray-800"
      }`}
    >
      {highlighted && (
        <div className="absolute -top-4 bg-primary dark:bg-[#ee8c2b] text-white text-[10px] font-black uppercase tracking-widest py-1 px-4 rounded-full">
          Recomendado
        </div>
      )}
      <h4 className="text-xl font-bold mb-2">{name}</h4>
      <p className="text-gray-500 dark:text-gray-300 mb-6">{description}</p>
      <div className="flex items-baseline gap-1 mb-8">
        <span className="text-4xl font-black">{price}</span>
        <span className="text-gray-500">/mes</span>
      </div>
      <ul className="w-full text-left space-y-4 mb-10">
        {features.map((feature) => (
          <li
            key={feature.text}
            className={`flex items-center gap-3 ${
              !feature.included ? "text-gray-400" : ""
            }`}
          >
            <span
              className={`material-symbols-outlined text-sm ${
                feature.included
                  ? highlighted
                    ? "text-primary dark:text-[#ee8c2b]"
                    : "text-green-500"
                  : ""
              }`}
            >
              {feature.included ? "check_circle" : "cancel"}
            </span>
            <span className="text-sm">{feature.text}</span>
          </li>
        ))}
      </ul>
      <button
        className={`w-full cursor-pointer h-12 rounded-full font-bold transition-all ${
          highlighted
            ? "bg-primary dark:bg-[#ee8c2b] text-white hover:opacity-90 shadow-lg shadow-primary/20"
            : "border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
        }`}
      >
        {buttonText}
      </button>
    </div>
  )
}
