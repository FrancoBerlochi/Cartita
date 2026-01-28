"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, Plus, Trash2, ListFilter, Info } from "lucide-react"

import { PhoneMockup } from "@/components/onboarding/phone-mockup"
import { OnboardingProgress } from "@/components/onboarding/onboarding-progress"
import { OnboardingFooter } from "@/components/onboarding/onboarding-footer"

import { useAuth } from "@/app/providers/AuthProvider"
import { getRestaurantByOwner } from "@/firebase/restaurants"
import {
  getMenuCategories,
  createMenuCategory,
  addItemsToCategory,
  seedDefaultCategories,
} from "@/firebase/menu"

import { MenuCategory } from "@/types/menu"

type DraftItem = {
  name: string
  price: string
  noPrice: boolean
}

export default function OnboardingMenu() {
  const { user } = useAuth()

  const [restaurant, setRestaurant] = useState<any>(null)
  const [categories, setCategories] = useState<MenuCategory[]>([])
  const [categoriaActiva, setCategoriaActiva] = useState<string | null>(null)

  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState<string | "new" | null>(null)
  const [nombreNuevaCategoria, setNombreNuevaCategoria] = useState("")

  const [draftItems, setDraftItems] = useState<DraftItem[]>([])
  
  const activeCategory = categories.find(c => c.id === categoriaActiva)
  const itemsPreview = activeCategory?.items ?? []

  /* ---------------- INIT ---------------- */
  const seededRef = useRef(false)

useEffect(() => {
  if (!user || seededRef.current) return
  seededRef.current = true

  getRestaurantByOwner(user.uid).then(setRestaurant)

  seedDefaultCategories(user.uid).then(async () => {
    const cats = await getMenuCategories(user.uid)
    setCategories(cats as MenuCategory[])

    if (cats.length > 0) {
      setCategoriaActiva(cats[0].id)
      setCategoriaSeleccionada(cats[0].id)
    }
  })
}, [user])


  /* ---------------- ITEMS ---------------- */
  const agregarItem = () => {
    setDraftItems(prev => [...prev, { name: "", price: "", noPrice: false }])
  }

  const actualizarItem = (
    index: number,
    field: keyof DraftItem,
    value: string | boolean,
  ) => {
    setDraftItems(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    )
  }

  const eliminarItem = (index: number) => {
    setDraftItems(prev => prev.filter((_, i) => i !== index))
  }

  /* ---------------- SAVE ---------------- */
  const guardarCategoria = async () => {
    if (!user || !categoriaSeleccionada) return

    const parsedItems = draftItems
      .filter(i => i.name.trim())
      .map(i => ({
        name: i.name,
        price: i.noPrice ? null : parseFloat(i.price) || 0,
        noPrice: i.noPrice,
      }))

    let categoryId = categoriaSeleccionada

    if (categoriaSeleccionada === "new") {
      if (!nombreNuevaCategoria.trim()) return

      const ref = await createMenuCategory(user.uid, nombreNuevaCategoria)
      categoryId = ref.id

      await addItemsToCategory(user.uid, ref.id, parsedItems)
    } else {
      await addItemsToCategory(user.uid, categoriaSeleccionada, parsedItems)
    }

    const updated = await getMenuCategories(user.uid)
    setCategories(updated as MenuCategory[])

    setCategoriaSeleccionada(categoryId)
    setCategoriaActiva(categoryId)

    setDraftItems([])
    setNombreNuevaCategoria("")
  }

  /* ---------------- UI ---------------- */
  return (
    <>
      <OnboardingProgress
        currentStep={2}
        totalSteps={4}
        stepTitle="Crea tu Menú"
        nextStepTitle="Elegir plan"
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-stone-800 dark:text-stone-100 mb-2">
          Añadí artículos y míralo en vivo.
        </h1>
        <p className="text-stone-500 dark:text-stone-300">
          Personaliza tu menú digital y previsualiza la experiencia del cliente.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* PREVIEW */}
        <div className="flex flex-col items-center">
          <p className="text-xs font-medium text-stone-400 mb-4">
            VISTA PREVIA DEL CLIENTE
          </p>

          <PhoneMockup>
            <div className="bg-orange-500 px-5 pt-12 pb-6">
              <h2 className="text-white font-bold text-md">
                {restaurant?.name ?? "Tu Restaurante"}
              </h2>
              <div className="flex items-center gap-1 text-orange-100 text-xs mt-1">
                <MapPin className="w-3 h-3" />
                <span>{restaurant?.location ?? "Dirección"}</span>
              </div>
            </div>

            <div className="flex gap-4 px-5 py-3 border-b border-orange-400 overflow-x-auto">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategoriaActiva(cat.id)}
                  className={`text-sm font-medium ${
                    categoriaActiva === cat.id
                      ? "text-orange-600"
                      : "text-stone-400"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="p-5 space-y-3">
              {itemsPreview.length > 0 ? (
                itemsPreview.map(item => (
                  <div
                    key={item.id}
                    className="flex justify-between p-3 bg-stone-50 dark:bg-stone-800 rounded-xl"
                  >
                    <p className="text-sm font-medium">{item.name}</p>
                    {!item.noPrice && item.price !== null && (
                      <span className="text-orange-500 font-semibold text-sm">
                        ${item.price}
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <div className="border-2 border-dashed border-stone-200 rounded-xl p-8 text-stone-300 flex flex-col items-center">
                  <Plus className="w-6 h-6 mb-2" />
                  <span className="text-xs">Vista previa del artículo</span>
                </div>
              )}
            </div>
          </PhoneMockup>
        </div>

        {/* FORM */}
        <div className="space-y-6 mt-8">
          <Card className="p-6 shadow-sm dark:bg-stone-950">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-50 dark:bg-stone-800 rounded-lg flex items-center justify-center">
                <ListFilter className="w-5 h-5 text-orange-500" />
              </div>
              <h3 className="font-semibold">Añadir Artículos</h3>
            </div>

            <div className="space-y-5">
              {/* SELECT */}
              <select
                value={categoriaSeleccionada ?? ""}
                onChange={e => {
                  const value =
                    e.target.value === "new" ? "new" : e.target.value

                  setCategoriaSeleccionada(value)
                  setDraftItems([])

                  if (value !== "new") {
                    setCategoriaActiva(value)
                    setNombreNuevaCategoria("")
                  }
                }}
                className="w-full rounded-md bg-stone-100 dark:bg-stone-800 dark:text-orange-400 p-2 text-sm"
              >
                <option value="" disabled>
                  Selecciona una categoría
                </option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
                <option value="new">Nueva categoría</option>
              </select>

              {categoriaSeleccionada === "new" && (
                <Input
                  value={nombreNuevaCategoria}
                  onChange={e => setNombreNuevaCategoria(e.target.value)}
                  placeholder="Ej: Especiales"
                  className="bg-stone-100"
                />
              )}

              {draftItems.map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={item.name}
                      onChange={e =>
                        actualizarItem(i, "name", e.target.value)
                      }
                      placeholder="Ej: Bruschetta"
                      className="bg-stone-100"
                    />
                    <Input
                      value={item.price}
                      disabled={item.noPrice}
                      onChange={e =>
                        actualizarItem(i, "price", e.target.value)
                      }
                      className="w-24 bg-stone-100"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => eliminarItem(i)}
                    >
                      <Trash2 className="w-4 h-4 text-orange-500" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={item.noPrice}
                      onCheckedChange={v =>
                        actualizarItem(i, "noPrice", Boolean(v))
                      }
                    />
                    <span className="text-xs text-stone-500">
                      Sin precio
                    </span>
                  </div>
                </div>
              ))}

              <button
                onClick={agregarItem}
                className="text-sm text-orange-500 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Añadir otro artículo
              </button>

              <Button
                onClick={guardarCategoria}
                variant="outline"
                className="w-full border-orange-500 text-orange-500"
              >
                Guardar
              </Button>
            </div>
          </Card>

          <div className="flex gap-3 p-4 bg-orange-50 dark:bg-stone-950 border rounded-xl">
            <Info className="w-5 h-5 text-orange-500" />
            <p className="text-sm text-stone-600 dark:text-stone-300">
              Luego podrás editar imágenes y descripciones desde el gestor.
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
  )
}
