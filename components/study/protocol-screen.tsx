"use client"

import { ChevronRight, LayoutGrid, Users, UserRound } from "lucide-react"

import { type StudyProtocol } from "@/components/study/types"

const protocolOptions: Array<{
  id: StudyProtocol
  label: string
  icon: typeof UserRound
}> = [
  { id: "student-athlete", label: "Student-Athlete Protocol", icon: UserRound },
  { id: "coaching-staff", label: "Coaching Staff Protocol", icon: Users },
]

interface ProtocolScreenProps {
  selectedProtocol: StudyProtocol | null
  onSelectProtocol: (protocol: StudyProtocol) => void
  onContinue: () => void
  onOpenWidgetDevelopment: () => void
}

export function ProtocolScreen({
  selectedProtocol,
  onSelectProtocol,
  onContinue,
  onOpenWidgetDevelopment,
}: ProtocolScreenProps) {
  return (
    <div className="min-h-screen bg-background px-4 py-10 text-foreground md:px-6">
      <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-card/70 p-6 shadow-2xl md:p-8">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Research protocol sample</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">Choose a protocol</h1>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {protocolOptions.map((option) => {
            const Icon = option.icon
            const isSelected = selectedProtocol === option.id

            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => onSelectProtocol(option.id)}
                className={`rounded-2xl border p-5 text-left transition-colors ${
                  isSelected
                    ? "border-primary bg-primary/10"
                    : "border-border bg-background/60 hover:bg-secondary/70"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`rounded-xl p-3 ${isSelected ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-base font-semibold text-foreground">{option.label}</p>
                </div>
              </button>
            )
          })}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onContinue}
            disabled={!selectedProtocol}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Continue
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 border-t border-border pt-5">
          <button
            type="button"
            onClick={onOpenWidgetDevelopment}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            <LayoutGrid className="h-4 w-4" />
            Widget Development Mode
          </button>
        </div>
      </div>
    </div>
  )
}
