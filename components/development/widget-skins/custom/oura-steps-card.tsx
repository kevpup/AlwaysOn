import { type WidgetSkinProps } from "@/components/development/widget-skins/types"

const STEP_COUNT = 7104
const STEP_TARGET = 10000

export function OuraStepsCard({ metric }: WidgetSkinProps) {
  const progress = STEP_COUNT / STEP_TARGET

  return (
    <div
      className="relative flex h-full overflow-hidden rounded-[28px] border border-[#dbe9ed] bg-[#0b5b7a] text-white shadow-[0_14px_34px_rgba(19,91,119,0.28)]"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(255,255,255,0.26), rgba(5,40,55,0.28)), url('/development/oura-water-texture.svg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/18 via-transparent to-[#052839]/38" />

      <div className="relative flex h-full w-full flex-col items-center justify-center px-4 pb-5 pt-8">
        <div className="absolute left-4 right-4 top-3 flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/82">Oura</p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/82">{metric.shortLabel}</p>
        </div>

        <div className="flex w-full flex-col items-center">
          <div className="relative w-full max-w-[260px]">
            <svg viewBox="0 0 286 152" className="h-auto w-full" aria-label="7104 steps toward 10000">
              <path
                d="M24 132 A119 119 0 0 1 262 132"
                fill="none"
                pathLength={100}
                stroke="rgba(255,255,255,0.34)"
                strokeLinecap="round"
                strokeWidth="18"
              />
              <path
                d="M24 132 A119 119 0 0 1 262 132"
                fill="none"
                pathLength={100}
                stroke="#ffffff"
                strokeDasharray={100}
                strokeDashoffset={100 - progress * 100}
                strokeLinecap="round"
                strokeWidth="18"
              />
            </svg>

            <div className="absolute left-0 top-[82%] text-xs font-semibold text-white/88">0</div>
            <div className="absolute right-0 top-[82%] text-xs font-semibold text-white/88">10,000</div>
          </div>

          <p className="mt-2 text-[36px] font-semibold leading-none tracking-[-0.04em] text-white">7104</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/80">steps</p>
        </div>
      </div>
    </div>
  )
}
