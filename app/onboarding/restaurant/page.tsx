"use client";

import React from "react";

import { useState } from "react";
import { ArrowRight, Bell, HelpCircle, MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ThemeToggle } from "@/components/theme-toggle";
import { useRouter } from "next/navigation";
import { createRestaurant } from "@/firebase/restaurants";
import { useAuth } from "@/app/providers/AuthProvider";

const BUSINESS_TYPES = [
  { value: "restaurante", label: "Restaurante" },
  { value: "bar", label: "Bar" },
  { value: "cafe", label: "Café" },
  { value: "food-truck", label: "Food truck" },
  { value: "otro", label: "Otro" },
];

const ARGENTINA_CITIES = [
  "Buenos Aires",
  "Córdoba",
  "Rosario",
  "Mendoza",
  "San Miguel de Tucumán",
  "La Plata",
  "Mar del Plata",
  "Salta",
  "Santa Fe",
  "San Juan",
  "Resistencia",
  "Neuquén",
  "Corrientes",
  "Posadas",
  "San Salvador de Jujuy",
  "Bahía Blanca",
  "Paraná",
  "Formosa",
  "San Luis",
  "Santiago del Estero",
  "La Rioja",
  "Catamarca",
  "Río Gallegos",
  "Ushuaia",
  "Rawson",
  "Viedma",
  "Santa Rosa",
];

export default function Restaurant() {
  const [name, setName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !name) return;

    try {
      setLoading(true);

      await createRestaurant(user.uid, {
        name,
        businessType: businessType || null,
        city: city || null,
      });

      router.replace("/onboarding/menu");
    } catch (err) {
      console.error("Error creating restaurant:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-linear-to-br from-orange-500 to-orange-600">
              <span className="text-lg font-bold text-white dark:text-black">
                C
              </span>
            </div>
            <span className="text-lg font-semibold text-stone-900 dark:text-stone-100">
              cartita
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-stone-600 dark:text-stone-300"
            >
              <Bell className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-stone-600 dark:text-stone-300"
            >
              <User className="h-5 w-5" />
            </Button>
            <ThemeToggle />
            <div className="ml-2 h-9 w-9 rounded-full border-2 border-orange-200 bg-orange-50 dark:bg-stone-800 dark:border-stone-700" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-2xl px-4 py-8">
        {/* Progress Section */}
        <div className="mb-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-stone-900 dark:text-stone-100">
              Paso 1 de 3: Información del Negocio
            </span>
            <span className="text-sm font-medium text-orange-500 dark:text-orange-400">
              33%
            </span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-stone-200">
            <div
              className="h-full rounded-full bg-linear-to-r from-orange-500 to-orange-400 transition-all duration-300"
              style={{ width: "33%" }}
            />
          </div>
          <p className="mt-2 text-sm text-stone-500 dark:text-stone-300">
            Siguiente: Configuración del Menú
          </p>
        </div>

        {/* Form Header */}
        <div className="mt-8 text-center">
          <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 text-balance">
            Creemos el perfil de tu negocio
          </h1>
          <p className="mt-3 text-stone-500 dark:text-stone-300 text-pretty">
            Contanos un poco sobre tu negocio para personalizar tu experiencia.
            Podés actualizar estos datos en cualquier momento desde la
            configuración.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="rounded-xl border border-stone-200 bg-white dark:bg-stone-950 dark:border-stone-800 p-6 shadow-sm">
            <div className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-stone-900 dark:text-stone-100"
                >
                  Nombre del Negocio
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Ej: La Parrilla de Juan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-11 text-orange-600 dark:text-orange-400 focus-visible:ring-orange-500"
                />
              </div>

              {/* Business Type Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="business-type"
                  className="text-sm font-medium text-stone-900 dark:text-stone-100"
                >
                  Tipo de Negocio
                </Label>
                <Select value={businessType} onValueChange={setBusinessType}>
                  <SelectTrigger id="business-type" className="h-11 w-full">
                    <SelectValue placeholder="Seleccioná un tipo de negocio" />
                  </SelectTrigger>
                  <SelectContent>
                    {BUSINESS_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <span className="text-orange-600 dark:text-orange-400">
                          {type.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* City Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="city"
                  className="text-sm font-medium text-stone-900 dark:text-stone-100"
                >
                  Ciudad
                </Label>
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger id="city" className="h-11 w-full">
                    <SelectValue placeholder="Seleccioná tu ciudad">
                      {city && (
                        <span className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-stone-400 dark:text-stone-200" />
                          <span className="text-orange-600 dark:text-orange-400">
                            {city}
                          </span>
                        </span>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {ARGENTINA_CITIES.map((cityName) => (
                      <SelectItem key={cityName} value={cityName}>
                        <span className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-stone-400" />
                          {cityName}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-stone-500 dark:text-stone-300">
                  Esta información se usará para tu perfil público y
                  facturación.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 space-y-3">
              <Button
                type="submit"
                disabled={loading || !name}
                className="h-12 w-full bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50"
              >
                {loading ? "Creando negocio..." : "Continuar con el Menú"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </form>

        {/* Help Link */}
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-stone-500">
          <HelpCircle className="h-4 w-4" />
          <span>¿Necesitás ayuda?</span>
          <a
            href="#"
            className="font-medium text-orange-500 hover:text-orange-600 hover:underline"
          >
            Contactar Soporte
          </a>
        </div>
      </main>
    </div>
  );
}
