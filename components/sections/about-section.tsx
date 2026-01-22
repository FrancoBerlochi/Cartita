export function AboutSection() {
  return (
    <section
      className="bg-white dark:bg-gray-900/50 py-24 px-4 md:px-20 lg:px-40"
      id="nosotros"
    >
      <div className="max-w-[800px] mx-auto text-center">
        <h2 className="text-primary font-bold text-sm tracking-widest uppercase mb-4">
          Nuestra Misión
        </h2>
        <h3 className="text-3xl md:text-4xl font-black mb-8 leading-tight text-balance">
          Impulsamos a los <span className="text-primary dark:text-[#ee8c2b]">restaurantes locales</span> a prosperar en un mundo online.
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          Simplificamos el salto de lo físico a lo digital. Creemos que cada
          restaurante merece una identidad online premium sin la complejidad
          técnica de construir un sitio web completo. Cartita conecta tu mesa
          con la pantalla de tu cliente.
        </p>
      </div>
    </section>
  )
}
