"use client"
import Link from "next/link";
import { useState } from "react";
import { Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useEffect } from "react";
export default function HeaderLoginRegister() {
    const [route, setRoute] = useState("");
    useEffect(() => {
        setRoute(window.location.pathname);
    }, []);

    return (
      <header className="flex items-center justify-between px-6 py-4 bg-card border-b">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-[#ff6900]/10 rounded-xl flex items-center justify-center">
            <Utensils className="w-5 h-5 text-[#ff6900]" />
          </div>
          <span className="font-semibold text-foreground text-lg">Cartita</span>
        </Link>

        <div className="flex w-1/6 justify-around">
          {route === "/register" ? (
            <Link href="/login" className="max-md:hidden">
              <Button
                variant="outline"
                className={`rounded-full cursor-pointer border-[#ff6900]/40 text-[#ff6900] hover:bg-[#ff6900]/10 bg-transparent`}
              >
                Iniciar sesión
              </Button>
            </Link>
          ) : (
            <Link href="/register" className="max-md:hidden">
              <Button
                variant="outline"
                className="rounded-full cursor-pointer border-[#ff6900]/40 text-[#ff6900] hover:bg-[#ff6900]/10 bg-transparent"
              >
                Crear cuenta
              </Button>
            </Link>
          )}
          <ThemeToggle />
        </div>
      </header>
    );
}