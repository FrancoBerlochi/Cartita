interface OnboardingProgressProps {
  currentStep: number
  totalSteps: number
  stepTitle: string
  nextStepTitle?: string
}

export function OnboardingProgress({
  currentStep,
  totalSteps,
  stepTitle,
  nextStepTitle,
}: OnboardingProgressProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left content */}
        <div className="w-full">
          <p className="text-sm font-medium text-stone-700 dark:text-stone-200">
            Paso {currentStep}: {stepTitle}
          </p>

          {/* Progress bars */}
          <div className="mt-2 flex w-full gap-1">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`h-1.5 flex-1 rounded-full ${
                  index < currentStep
                    ? "bg-orange-500"
                    : "bg-stone-200 dark:bg-stone-700"
                }`}
              />
            ))}
          </div>

          {nextStepTitle && (
            <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
              Siguiente: {nextStepTitle}
            </p>
          )}
        </div>

        {/* Right content */}
        <p className="text-sm text-stone-500 dark:text-stone-400 sm:text-right">
          {currentStep} de {totalSteps} pasos completados
        </p>
      </div>
    </div>
  )
}
