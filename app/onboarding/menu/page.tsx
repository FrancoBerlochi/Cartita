"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Plus, Trash2, ListFilter, Info } from "lucide-react";
import { PhoneMockup } from "@/components/onboarding/phone-mockup";
import { OnboardingProgress } from "@/components/onboarding/onboarding-progress";
import { OnboardingFooter } from "@/components/onboarding/onboarding-footer";
import { useAuth } from "@/app/providers/AuthProvider";
import { getRestaurantByOwner } from "@/firebase/restaurants";
import { getMenuCategories, createMenuCategory } from "@/firebase/menu"
import {MenuCategory, MenuItem} from "@/types/menu"

interface Category {
  nombre: string;
  items: MenuItem[];
}

export default function OnboardingMenu() {
  const { user } = useAuth();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [draftItems, setDraftItems] = useState<{
  name: string
  price: string
  noPrice: boolean
}[]>([])

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | "new" | null>(null)
  const [nombreNuevaCategoria, setNombreNuevaCategoria] = useState("")
  const [categoriaActiva, setCategoriaActiva] = useState<string | null>(null);
  const [nombreCategoria, setNombreCategoria] = useState("Entradas");
  const activeCategory = categories.find(c => c.id === categoriaActiva)
  const itemsPreview = activeCategory?.items ?? []


  useEffect(() => {
    if (!user) return;

    getRestaurantByOwner(user.uid).then(setRestaurant);
    getMenuCategories(user.uid).then(setCategories);
  }, [user]);

  useEffect(() => {
  if (categories.length > 0 && !categoriaActiva) {
    setCategoriaActiva(categories[0].id)
  }
}, [categories])

const agregarItem = () => {
  setDraftItems(prev => [
    ...prev,
    { name: "", price: "", noPrice: false }
  ])
}

const actualizarItem = (
  index: number,
  field: "name" | "price" | "noPrice",
  value: string | boolean
) => {
  setDraftItems(prev =>
    prev.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    )
  )
}

const eliminarItem = (index: number) => {
  setDraftItems(prev => prev.filter((_, i) => i !== index))
}

const guardarCategoria = async () => {
  if (!user || !nombreCategoria.trim()) return

  await createMenuCategory(user.uid, {
    name: nombreCategoria,
    items: draftItems.map(item => ({
      name: item.name,
      price: item.noPrice ? null : Number(item.price),
      noPrice: item.noPrice
    }))
  })

  const updated = await getMenuCategories(user.uid)
  setCategories(updated)

  setNombreCategoria("")
  setDraftItems([])
}

  
  return (
    <>
      <OnboardingProgress
        currentStep={2}
        totalSteps={4}
        stepTitle="Crea tu Menú"
        nextStepTitle="Elegir plan"
      />

      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-stone-800 dark:text-stone-100 mb-2 text-balance">
          Añadí artículos y míralo en vivo.
        </h1>
        <p className="text-stone-500 dark:text-stone-300 text-pretty">
          Personaliza tu menú digital y previsualiza la experiencia del cliente
          en tiempo real.
        </p>
      </div>

      {/* Content */}
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Phone Preview */}
        <div className="flex flex-col items-center">
          <p className="text-xs font-medium text-stone-400 tracking-wider mb-4">
            VISTA PREVIA DEL CLIENTE
          </p>
          <PhoneMockup>
            {/* Phone Header */}
            <div className="bg-orange-500 px-5 pt-12 pb-6">
              <h2 className="text-white font-bold text-md">
                {restaurant?.name ?? "Tu Restaurante"}
              </h2>
              <div className="flex items-center gap-1 text-orange-100 text-xs mt-1">
                <MapPin className="w-3 h-3" />
                <span className="text-sm">
                  {restaurant?.location ?? "Dirección del restaurante"}
                </span>
              </div>
            </div>

            {/* Phone Tabs */}
            <div className="flex gap-4 px-5 py-3 border-b border-orange-400 dark:border-stone-800 overflow-x-auto">
              {categories.map((cat) => (
                <button key={cat.id} onClick={() => setCategoriaActiva(cat.id)}>
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Phone Items */}
            <div className="p-5 space-y-3">
              {itemsPreview.length > 0 ? (
                itemsPreview.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-start p-3 bg-stone-50 dark:bg-stone-800 rounded-xl"
                  >
                    <div>
                      <p className="font-medium text-stone-800 dark:text-stone-200 text-sm">
                        {item.name}
                      </p>
                      <p className="text-xs text-stone-400 dark:text-stone-300 mt-0.5">
                        Delicioso plato artesanal
                      </p>
                    </div>
                    {!item.noPrice && item.price !== null && (
  <span className="text-orange-500 font-semibold text-sm">
    ${item.price}
  </span>
)}
                  </div>
                ))
              ) : (
                <div className="border-2 border-dashed border-stone-200 rounded-xl p-8 flex flex-col items-center justify-center text-stone-300">
                  <Plus className="w-6 h-6 mb-2" />
                  <span className="text-xs">Vista previa del artículo</span>
                </div>
              )}
            </div>
          </PhoneMockup>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <Card className="p-6 bg-white border-stone-200 dark:bg-stone-950 dark:border-stone-800 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-50 dark:bg-stone-800 rounded-lg flex items-center justify-center">
                <ListFilter className="w-5 h-5 text-orange-500" />
              </div>
              <h3 className="font-semibold text-stone-800 dark:text-stone-200">
                Añadir Artículos Rápidamente
              </h3>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-xs font-medium text-stone-500 dark:text-stone-300 tracking-wider">
                  NOMBRE DE LA CATEGORÍA
                </label>
                <Input
                  value={nombreCategoria}
                  onChange={(e) => setNombreCategoria(e.target.value)}
                  placeholder="Ej: Especiales de la Casa"
                  className="mt-2 bg-stone-100 border-0 focus-visible:ring-orange-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-stone-500 dark:text-stone-300 tracking-wider">
                  ARTÍCULOS EN LA CATEGORÍA
                </label>
                <div className="space-y-3 mt-2">
                 {draftItems.map((item, index) => (
  <div key={index} className="space-y-2">
    <div className="flex gap-2">
      <Input
        value={item.name}
        onChange={(e) =>
          actualizarItem(index, "name", e.target.value)
        }
        placeholder={
          index === 0 ? "Ej: Bruschetta" : "Ej: Croquetas"
        }
        className="flex-1 bg-stone-100 border-0 focus-visible:ring-orange-500"
      />

      <Input
        value={item.price}
        onChange={(e) =>
          actualizarItem(index, "price", e.target.value)
        }
        placeholder="0.00"
        disabled={item.noPrice}
        className="w-24 bg-stone-100 border-0 focus-visible:ring-orange-500 disabled:opacity-50"
      />

      <Button
        variant="ghost"
        size="icon"
        onClick={() => eliminarItem(index)}
        className="text-orange-500 hover:text-orange-600 hover:bg-orange-50"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>

    <div className="flex items-center gap-2 pl-1">
      <Checkbox
        id={`noPrice-${index}`}
        checked={item.noPrice}
        onCheckedChange={(checked) =>
          actualizarItem(index, "noPrice", checked as boolean)
        }
        className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
      />
      <label
        htmlFor={`noPrice-${index}`}
        className="text-xs text-stone-500 cursor-pointer"
      >
        Sin precio (consultar)
      </label>
    </div>
  </div>
))}

                </div>
              </div>

              <button
                onClick={agregarItem}
                className="flex items-center gap-2 text-orange-500 font-medium text-sm hover:text-orange-600"
              >
                <Plus className="w-4 h-4" />
                Añadir otro artículo
              </button>

              <Button
                onClick={guardarCategoria}
                variant="outline"
                className="w-full border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-600 bg-transparent"
              >
                Guardar Categoría y Añadir Nueva
              </Button>
            </div>
          </Card>

          {/* Pro Tip */}
          <div className="flex gap-3 p-4 bg-orange-50 dark:bg-stone-950 dark:border-stone-800 border rounded-xl">
            <Info className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-stone-600 dark:text-stone-300">
              <span className="font-medium text-stone-700 dark:text-stone-200">
                Consejo:{" "}
              </span>
              Puedes subir imágenes para cada artículo más tarde en el Gestor de
              Menú para hacer tu menú digital aún más atractivo.
            </p>
          </div>
        </div>
      </div>

      <OnboardingFooter
        backLabel="Volver a Información del Negocio"
        onBack={() => {}}
        showSkip={false}
        onContinue={() => {}}
      />
    </>
  );
}
