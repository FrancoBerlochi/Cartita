"use client";

import { useAuth } from "@/app/providers/AuthProvider";
import { redirect } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  if (user === undefined) return <p>Cargando...</p>;

  if (!user) {
    redirect("/login");
  }

  return <>{children}</>;
}
