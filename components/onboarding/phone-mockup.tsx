import { ReactNode } from "react"

interface PhoneMockupProps {
  children: ReactNode
}

export function PhoneMockup({ children }: PhoneMockupProps) {
  return (
    <div className="relative">
      <div className="w-72 h-[580px] bg-stone-900 rounded-[3rem] p-3 shadow-2xl relative">
        {/* Dynamic Island */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-20" />
        
        {/* Screen */}
        <div className="w-full h-full bg-white dark:bg-stone-950 rounded-[2.5rem] overflow-hidden relative">
          {children}
        </div>
      </div>
    </div>
  )
}
