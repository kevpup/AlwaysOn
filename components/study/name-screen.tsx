"use client"

import { type FormEvent } from "react"
import { ChevronRight, LayoutGrid } from "lucide-react"

interface NameScreenProps {
  name: string
  onNameChange: (value: string) => void
  onOpenWidgetDevelopment: () => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function NameScreen({ name, onNameChange, onOpenWidgetDevelopment, onSubmit }: NameScreenProps) {
  return (
    <div className="min-h-screen bg-background px-4 py-10 text-foreground md:px-6">
      <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card/70 p-6 shadow-2xl md:p-8">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Student-athlete wearable research - participatory design
          </p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Welcome to the participatory design. You will be presented with different scenarios that you might face,
            or have faced as a student-athlete. During those times you will be asked to select what kind of data
            from a wearable device you would want to share with your coaching staff. Enter your participant ID to begin.
          </p>
        </div>

        <form className="mt-8 grid gap-4" onSubmit={onSubmit}>
          <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
            <span>
              Participant ID <span className="text-destructive">*</span>
            </span>
            <input
              type="text"
              value={name}
              onChange={(event) => onNameChange(event.target.value)}
              className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
              placeholder="Enter participant ID"
              autoComplete="off"
              required
            />
          </label>

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
