"use client"

import { ChevronLeft, RotateCcw } from "lucide-react"

interface CompletionScreenProps {
  canGoBack: boolean
  onBack: () => void
  onResetSession: () => void
}

export function CompletionScreen({ canGoBack, onBack, onResetSession }: CompletionScreenProps) {
  return (
    <div className="min-h-screen bg-background px-4 py-10 text-foreground md:px-6">
      <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card/70 p-6 text-center shadow-2xl md:p-8">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Thank You</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Thank you for participating</h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
          Your responses have been recorded. Thank you for taking the time to share your perspective on wearable
          data and coaching.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {canGoBack ? (
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>
          ) : null}
          <button
            onClick={onResetSession}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            <RotateCcw className="h-4 w-4" />
            Start New Session
          </button>
        </div>
      </div>
    </div>
  )
}
