"use client"

import { type FormEvent } from "react"
import { ChevronRight, LayoutGrid } from "lucide-react"

interface NameScreenProps {
  onOpenWidgetDevelopment: () => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function NameScreen({ onOpenWidgetDevelopment, onSubmit }: NameScreenProps) {
  return (
    <div className="min-h-screen bg-background px-4 py-10 text-foreground md:px-6">
      <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card/70 p-6 shadow-2xl md:p-8">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Student-athlete wearable research - participatory design
          </p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Welcome to a demo of our participatory design. Please click continue to view the scenarios that
            student-athletes and coaching staff would view if they were participating in the study. You will be able
            to see all 11 scenarios from student-athletes, while participants only were shown a couple of scenarios at
            random depending on time constraints.
          </p>
        </div>

        <form className="mt-8" onSubmit={onSubmit}>
          <div className="pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Continue
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </form>

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
