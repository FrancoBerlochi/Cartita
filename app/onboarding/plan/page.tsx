"use client";
import { useState } from "react";
import {
  basicFeatures,
  proFeatures,
  PricingCard,
} from "@/components/sections/pricing-section";
import { OnboardingProgress } from "@/components/onboarding/onboarding-progress";
import { OnboardingFooter } from "@/components/onboarding/onboarding-footer";
import { useAuth } from "@/app/providers/AuthProvider";
import { updateRestaurantPlan } from "@/firebase/restaurants";
import { useRouter } from "next/navigation";

type PlanType = "BASIC" | "PRO" | null;

export default function PlanOnboardingPage() {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<PlanType>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFinish = async () => {
    if (!user || !selectedPlan) return;

    try {
      setLoading(true);

      await updateRestaurantPlan(user.uid, selectedPlan);

      router.push("/onboarding/payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <main aria-labelledby="pricing-title">
        <OnboardingProgress
          currentStep={3}
          totalSteps={4}
          stepTitle="Elegí tu plan"
        />

        <header className="mt-8 text-center">
          <h1
            id="pricing-title"
            className="text-3xl font-bold text-stone-900 dark:text-stone-100 text-balance"
          >
            Elegí el plan que mejor se adapte a tu negocio
          </h1>
          <p className="mt-3 text-stone-500 dark:text-stone-300 text-pretty">
            Planes flexibles para crear tu menú digital, atraer clientes y
            escalar tu restaurante.
          </p>
        </header>

        <section className="py-12 px-4" aria-label="Planes disponibles">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-225 mx-auto">
              <PricingCard
                name="Básico"
                description="Perfecto para empezar"
                price="$8.500"
                features={basicFeatures}
                buttonText="Elegir Básico"
                selected={selectedPlan === "BASIC"}
                onSelect={() => setSelectedPlan("BASIC")}
                plan={true}
              />

              <PricingCard
                name="Pro"
                description="Todo lo que necesitás para crecer"
                price="$15.000"
                features={proFeatures}
                buttonText="Elegir Pro"
                highlighted
                selected={selectedPlan === "PRO"}
                onSelect={() => setSelectedPlan("PRO")}
                plan={true}
              />
            </div>
          </div>
        </section>
      </main>

      <OnboardingFooter
        continueLabel={
          loading
            ? "Guardando..."
            : selectedPlan === "PRO"
              ? "Continuar al pago"
              : "Finalizar"
        }
        onContinue={handleFinish}
        disabled={!selectedPlan || loading}
        showBack={false}
        showSkip={false}
      />
    </div>
  );
}
