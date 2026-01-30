"use client";

import Profile from "@/components/profile/profile";

export default function Demo() {
  return (
    <div className=" w-screen h-screen  flex items-center bg-white">
      <Profile
        name="The Golden Heart"
        description="Artisanal wood-fired pizzas and seasonal craft
cocktails in the heart of the city."
      />
    </div>
  );
}
