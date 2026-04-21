"use client"

import { ChevronLeft, ChevronRight, Mars, Venus } from "lucide-react"

import { type SportCategory } from "@/components/study/types"

const sportCategoryOptions: Array<{
  id: SportCategory
  label: string
  icon: typeof Mars
}> = [
  {
    id: "mens",
    label: "Men's sports",
    icon: Mars,
  },
  {
    id: "womens",
    label: "Women's sports",
    icon: Venus,
  },
]

interface SportCategoryScreenProps {
  selectedSportCategory: SportCategory | null
  onSelectSportCategory: (sportCategory: SportCategory) => void
  onBack: () => void
  onContinue: () => void
}

export function SportCategoryScreen({
  selectedSportCategory,
  onSelectSportCategory,
  onBack,
  onContinue,
}: SportCategoryScreenProps) {
  return (
    <div className="min-h-screen bg-background px-4 py-10 text-foreground md:px-6">
      <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-card/70 p-6 shadow-2xl md:p-8">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Sport Category</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Do you participate in men's or women's sports?
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            This helps us show the wearable data examples that are relevant to this session.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {sportCategoryOptions.map((option) => {
            const Icon = option.icon
            const isSelected = selectedSportCategory === option.id

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onSelectSportCategory(option.id)}
                className={`rounded-2xl border p-5 text-left transition-colors ${
                  isSelected
                    ? "border-primary bg-primary/10"
                    : "border-border bg-background/60 hover:bg-secondary/70"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`rounded-xl p-3 ${
                      isSelected ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-base font-semibold text-foreground">{option.label}</p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>
          <button
            type="button"
            onClick={onContinue}
            disabled={!selectedSportCategory}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Continue to Device Selection
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
