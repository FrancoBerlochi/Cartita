import { Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function OnboardingHeader() {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800">
      <div className="flex items-center gap-2">
        <div className="flex flex-col">
          <div className="w-6 h-1.5 bg-orange-500 rounded-full" />
          <div className="w-6 h-1.5 bg-orange-400 rounded-full mt-0.5" />
          <div className="w-6 h-1.5 bg-orange-300 rounded-full mt-0.5" />
        </div>
        <span className="font-semibold text-lg text-stone-800 dark:text-stone-100">Cartita</span>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="text-stone-600 dark:text-stone-100">
          <Bell className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-stone-600 dark:text-stone-100">
          <User className="w-5 h-5" />
        </Button>
      </div>
    </header>
  )
}
