import { type WidgetSkinProps } from "@/components/development/widget-skins/types"

const STEP_COUNT = 7104
const STEP_TARGET = 10000

export function GarminStepsCard({ metric }: WidgetSkinProps) {
  const percent = STEP_COUNT / STEP_TARGET
  const circumference = 2 * Math.PI * 42
  const dashOffset = circumference * (1 - percent)

  return (
    <div className="flex h-full flex-col rounded-[18px] border border-[#d8e1e8] bg-white text-[#14212b] shadow-[0_10px_26px_rgba(20,33,43,0.14)]">
      <div className="flex min-h-0 flex-1 items-center justify-center p-4">
        <div className="relative flex aspect-square w-[82%] max-w-[230px] min-w-[150px] items-center justify-center">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full rotate-[-90deg]" aria-hidden="true">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#e4edf3" strokeWidth="8" />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#007cc3"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              strokeWidth="8"
            />
          </svg>
          <div className="text-center">
            <p className="text-4xl font-extrabold leading-none tracking-[-0.04em]">{metric.primaryValue}</p>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-[#607080]">steps</p>
          </div>
        </div>
      </div>
    </div>
  )
}
