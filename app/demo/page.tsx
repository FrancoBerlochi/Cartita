"use client";
import { ThemeToggle } from "@/components/theme-toggle";

import Profile from "@/components/profile/profile";

export default function Demo() {
  return (
    <div className="relative w-screen h-screen flex items-center bg-white dark:bg-stone-950">
      <Profile
        name="The Golden Heart"
        description="Artisanal wood-fired pizzas and seasonal craft
cocktails in the heart of the city."
      />
      <div className="absolute inset-0 top-10 bottom-0 left-[calc(100%-80px)] max-md:top-6 max-md:left-[calc(100%-60px)]">
        <ThemeToggle></ThemeToggle>
      </div>
    </div>
  );
}
