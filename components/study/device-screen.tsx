"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

import { deviceOptions } from "@/components/study/constants"
import { type DeviceType } from "@/components/study/types"

interface DeviceScreenProps {
  selectedDeviceType: DeviceType | null
  onSelectDeviceType: (deviceType: DeviceType) => void
  onBack: () => void
  onContinue: () => void
}

export function DeviceScreen({
  selectedDeviceType,
  onSelectDeviceType,
  onBack,
  onContinue,
}: DeviceScreenProps) {
  return (
    <div className="min-h-screen bg-background px-4 py-10 text-foreground md:px-6">
      <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-card/70 p-6 shadow-2xl md:p-8">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Device Familiarity</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">Select the device you know best</h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Choose the wearable platform you are most familiar with. This will later help tailor the look of the
            widgets to something closer to the interface you already know.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {deviceOptions.map((option) => {
            const Icon = option.icon
            const isSelected = selectedDeviceType === option.id

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onSelectDeviceType(option.id)}
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
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{option.description}</p>
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
            disabled={!selectedDeviceType}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Continue to Scenarios
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
