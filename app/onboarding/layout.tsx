"use client";

import { useAuth } from "@/app/providers/AuthProvider";
import { redirect } from "next/navigation";
import OnboardingHeader from "@/components/onboarding/onboarding-header";

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

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <OnboardingHeader />
      <main className="max-w-6xl mx-auto px-8 py-8">
        {children}
      </main>
    </div>
  )
}

