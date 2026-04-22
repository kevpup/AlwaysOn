"use client"

import { heartRateData } from "@/lib/mock-data"
import { type AppleWatchHrLinePoint } from "@/lib/apple-watch-hr-data"
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"

const WHOOP_HR_BLUE = "hsl(200, 70%, 50%)"
const WHOOP_AXIS_BLACK = "hsl(220, 20%, 4%)"
const MINUTES_IN_DAY = 1440
const WHOOP_HOUR_TICKS = Array.from({ length: 9 }, (_, index) => index * 180)

function formatHourTick(minuteOfDay: number) {
  return String(Math.round(minuteOfDay / 60))
}

const CustomXTick = (props: any) => {
  const { x, y, payload } = props
  let textAnchor: "start" | "middle" | "end" = "middle"
  let dx = 0
  if (payload.value === 0) {
    textAnchor = "start"
  } else if (payload.value === MINUTES_IN_DAY) {
    textAnchor = "end"
  }
  
  return (
    <text x={x} y={y} dy={12} dx={dx} textAnchor={textAnchor} fill="hsl(215, 12%, 55%)" fontSize={10}>
      {formatHourTick(payload.value)}
    </text>
  )
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ value: number }> }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-md">
        <p className="text-sm font-semibold text-foreground">
          {payload[0].value} <span className="text-xs font-normal text-muted-foreground">bpm</span>
        </p>
      </div>
    )
  }
  return null
}

interface HeartRateWidgetProps {
  data?: AppleWatchHrLinePoint[]
}

export function HeartRateWidget({ data = heartRateData }: HeartRateWidgetProps = {}) {
  const chartData = data.map((point, index) => ({
    ...point,
    minuteOfDay: point.minuteOfDay ?? (data.length <= 1 ? 0 : (index / (data.length - 1)) * MINUTES_IN_DAY),
  }))
  const currentHr = chartData[chartData.length - 1].hr
  const maxHr = Math.max(...chartData.map((d) => d.hr))
  const minHr = Math.min(...chartData.map((d) => d.hr))
  const axisMin = Math.max(30, Math.floor((minHr - 10) / 10) * 10)
  const axisMax = Math.ceil((maxHr + 10) / 10) * 10
  const yTicks = [axisMin, Math.round((axisMin + axisMax) / 2), axisMax]

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-foreground">{currentHr}</span>
          <span className="text-xs text-muted-foreground">last HR reading</span>
        </div>
        <div className="flex gap-3 text-xs text-muted-foreground">
          <span>
            Low <span className="font-medium" style={{ color: WHOOP_HR_BLUE }}>{minHr}</span>
          </span>
          <span>
            High <span className="font-medium" style={{ color: WHOOP_HR_BLUE }}>{maxHr}</span>
          </span>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[28px_1fr] gap-1">
        <div className="relative pb-[24px] pt-[8px]">
          <div className="relative h-full w-full pr-1" style={{ borderRight: `1px solid ${WHOOP_AXIS_BLACK}` }}>
            {yTicks.map((tick) => (
              <span
                key={tick}
                className="absolute right-1 translate-y-1/2 text-[10px] text-[hsl(215,12%,55%)]"
                style={{ bottom: `${((tick - axisMin) / (axisMax - axisMin)) * 100}%` }}
              >
                {tick}
              </span>
            ))}
          </div>
        </div>

        <div className="relative min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 8, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="whoopHeartRateGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={WHOOP_HR_BLUE} stopOpacity={0.34} />
                  <stop offset="100%" stopColor={WHOOP_HR_BLUE} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="minuteOfDay"
                domain={[0, MINUTES_IN_DAY]}
                tick={<CustomXTick />}
                tickLine={false}
                tickMargin={0}
                ticks={WHOOP_HOUR_TICKS}
                type="number"
                axisLine={{ stroke: WHOOP_AXIS_BLACK, strokeOpacity: 0.9 }}
                height={24}
              />
              <YAxis
                domain={[axisMin, axisMax]}
                hide
              />
              <Tooltip content={<CustomTooltip />} />
              {yTicks.map((tick) => (
                <ReferenceLine key={tick} y={tick} stroke={WHOOP_AXIS_BLACK} strokeDasharray="3 3" strokeOpacity={0.75} />
              ))}
              <Area
                type="linear"
                dataKey="hr"
                fill="url(#whoopHeartRateGradient)"
                stroke={WHOOP_HR_BLUE}
                strokeWidth={1}
                dot={false}
                activeDot={{ r: 4, fill: WHOOP_HR_BLUE, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
