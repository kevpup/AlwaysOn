"use client"

import { type WidgetSkinProps } from "@/components/development/widget-skins/types"

const tickAngles = [-70, -45, -20, 5, 30, 55, 80]

export function OuraReadinessCard(_props: WidgetSkinProps) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-[30px] border border-white/[0.08] bg-[#071019] text-white shadow-[0_24px_52px_rgba(0,0,0,0.4)]">
      <div
        className="absolute inset-0 scale-110 blur-sm"
        style={{
          background:
            "radial-gradient(circle at 26% 24%, rgba(135, 203, 224, 0.46), transparent 28%), radial-gradient(circle at 76% 18%, rgba(73, 116, 182, 0.44), transparent 34%), linear-gradient(145deg, #061019 0%, #0d2638 48%, #122f4a 72%, #070d15 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-55"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.12), transparent 30%, rgba(0,0,0,0.34)), radial-gradient(ellipse at 50% 78%, rgba(179,225,232,0.18), transparent 48%)",
        }}
      />
      <div className="absolute inset-0 bg-black/22" />

      <svg className="absolute left-1/2 top-8 h-40 w-72 -translate-x-1/2 overflow-visible" viewBox="0 0 280 150" aria-hidden="true">
        <path
          d="M 28 124 A 112 112 0 0 1 252 124"
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeLinecap="round"
          strokeWidth="7"
        />
        <path
          d="M 28 124 A 112 112 0 0 1 252 124"
          fill="none"
          stroke="rgba(255,255,255,0.92)"
          strokeLinecap="round"
          strokeWidth="3"
          filter="drop-shadow(0 0 10px rgba(185,220,224,0.3))"
        />
        {tickAngles.map((angle) => (
          <line
            key={angle}
            x1="140"
            x2="140"
            y1="10"
            y2="20"
            stroke="rgba(255,255,255,0.46)"
            strokeLinecap="round"
            strokeWidth="2"
            transform={`rotate(${angle} 140 124)`}
          />
        ))}
      </svg>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center px-6 pt-16 text-center">
        <p className="text-8xl font-semibold leading-none tracking-[-0.09em] text-white drop-shadow-[0_8px_28px_rgba(0,0,0,0.42)]">
          88
        </p>
        <p className="mt-4 text-sm font-semibold uppercase tracking-[0.26em] text-[#dceff3]/86">Readiness</p>
      </div>
    </div>
  )
}
