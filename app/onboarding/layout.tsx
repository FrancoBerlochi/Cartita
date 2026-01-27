"use client";

import { useAuth } from "@/app/providers/AuthProvider";
import { redirect } from "next/navigation";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  if (user === undefined) return null;

  if (!user) {
    redirect("/login");
  }

  return <>{children}</>;
}
