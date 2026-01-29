"use client"
import { OnboardingProgress } from "@/components/onboarding/onboarding-progress";
export default function PaymentOnboardingPage() {

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
            <main aria-labelledby="payment-title">
                <OnboardingProgress
                    currentStep={4}
                    totalSteps={4}
                    stepTitle="Finaliza tu suscripción"
                />

                <header className="mt-8 text-center">
          <h1
            id="payment-title"
            className="text-3xl font-bold text-stone-900 dark:text-stone-100 text-balance"
          >
            Finalizá tu suscripción y comenzá a usar Cartita
          </h1>
          <p className="mt-3 text-stone-500 dark:text-stone-300 text-pretty">
            Pagá con <span className="text-blue-400 underline">Mercado Pago</span> de forma segura y rápida para activar tu plan y
            empezar a crear tu menú digital.
          </p>
        </header>
            </main>
        </div>
    )

}
