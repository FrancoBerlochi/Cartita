'use client';

import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface OnboardingFooterProps {
  backLabel?: string
  onBack?: () => void
  skipLabel?: string
  onSkip?: () => void
  continueLabel?: string
  onContinue?: () => void
  disabled?: boolean
  showBack?: boolean
  showSkip?: boolean
}

export function OnboardingFooter({
  backLabel = "Volver",
  onBack,
  skipLabel = "Saltar por ahora",
  onSkip,
  continueLabel = "Continuar",
  onContinue,
  disabled = false,
  showBack = true,
  showSkip = true,
}: OnboardingFooterProps) {
  return (
    <div className="flex items-center justify-between mt-12 pt-6 border-t border-stone-200 dark:border-stone-800">
      {showBack ? (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-stone-600 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          {backLabel}
        </button>
      ) : (
        <div />
      )}
      <div className="flex items-center gap-4">
        {showSkip && (
          <button onClick={onSkip} className="text-stone-500 hover:text-stone-700">
            {skipLabel}
          </button>
        )}
        <Button
          onClick={onContinue}
          disabled={disabled}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 gap-2"
        >
          {continueLabel}
          <ArrowRight className="w-4 h-4" /> 
        </Button>
      </div>
    </div>
  )
}
