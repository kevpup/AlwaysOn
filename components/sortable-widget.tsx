"use client"

import { useState } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { type WidgetConfig } from "@/lib/mock-data"
import { getWidgetDisplayName } from "@/lib/widget-display-names"
import { widgetInformationById } from "@/lib/widget-information"
import { WidgetRenderer } from "@/components/widgets/widget-renderer"
import { type DeviceType, type SportCategory } from "@/components/study/types"
import { EyeOff, Info, RotateCcw } from "lucide-react"

interface SortableWidgetProps {
  deviceType: DeviceType
  scenarioId?: string
  widget: WidgetConfig
  disableSorting?: boolean
  onMoveToNotDisplayed?: () => void
  sportCategory: SportCategory
}

export function SortableWidget({
  deviceType,
  scenarioId,
  widget,
  disableSorting = false,
  onMoveToNotDisplayed,
  sportCategory,
}: SortableWidgetProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: widget.id, disabled: disableSorting })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  const displayName = getWidgetDisplayName(widget, { deviceType, scenarioId })
  const widgetInformation = widgetInformationById[widget.id]
  const [showInformation, setShowInformation] = useState(false)

  function stopControlDrag(event: React.PointerEvent<HTMLButtonElement>) {
    event.stopPropagation()
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      aria-label={disableSorting ? displayName : `Drag ${displayName}`}
      className={`group relative aspect-square w-full ${
        disableSorting ? "cursor-default" : "cursor-grab active:cursor-grabbing"
      } ${
        isDragging ? "z-50 opacity-50" : ""
      }`}
    >
      <div className="[perspective:1200px] h-full w-full">
        <div
          className={`relative h-full w-full transition-transform duration-300 [transform-style:preserve-3d] ${
            showInformation ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          <div
            className={`absolute inset-0 [backface-visibility:hidden] ${
              showInformation ? "pointer-events-none" : "pointer-events-auto"
            }`}
          >
            <div className="flex h-full w-full flex-col overflow-hidden rounded-[24px] border border-border/60 bg-background/35 shadow-sm">
              <div className="flex min-h-8 items-center border-b border-border/60 bg-background/88 px-3 backdrop-blur-sm">
                <p className="truncate text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {displayName}
                </p>
              </div>

              <div className="relative min-h-0 flex-1">
                <div className="absolute right-2 top-2 z-20 flex flex-wrap justify-end gap-1.5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                  {widgetInformation ? (
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        setShowInformation(true)
                      }}
                      onPointerDown={stopControlDrag}
                      className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-background/80 px-2.5 py-1 text-[11px] font-medium text-muted-foreground shadow-sm backdrop-blur-sm transition-colors hover:text-foreground"
                    >
                      <Info className="h-3 w-3" />
                      More information
                    </button>
                  ) : null}
                  {onMoveToNotDisplayed && (
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        onMoveToNotDisplayed()
                      }}
                      onPointerDown={stopControlDrag}
                      className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-background/80 px-2.5 py-1 text-[11px] font-medium text-muted-foreground shadow-sm backdrop-blur-sm transition-colors hover:text-foreground"
                    >
                      <EyeOff className="h-3 w-3" />
                      Hide from Staff
                    </button>
                  )}
                </div>

                <div className="h-full w-full">
                  <WidgetRenderer deviceType={deviceType} id={widget.id} sportCategory={sportCategory} />
                </div>
              </div>
            </div>
          </div>

          <div
            className={`absolute inset-0 overflow-hidden rounded-[24px] border border-border bg-card p-4 text-card-foreground shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)] ${
              showInformation ? "pointer-events-auto" : "pointer-events-none"
            }`}
            onPointerDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                setShowInformation(false)
              }}
              onPointerDown={stopControlDrag}
              className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-muted-foreground shadow-sm transition-colors hover:text-foreground"
            >
              <RotateCcw className="h-3 w-3" />
              Back
            </button>

            <div className="flex h-full flex-col gap-3 overflow-y-auto pr-1">
              <div className="pr-20">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  More information
                </p>
                <h3 className="mt-1 text-lg font-semibold leading-tight text-foreground">{displayName}</h3>
              </div>

              {widgetInformation ? (
                <div className="grid gap-3 text-sm leading-5">
                  <section>
                    <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      What it shows
                    </h4>
                    <p className="mt-1 text-foreground">{widgetInformation.shows}</p>
                  </section>
                  <section>
                    <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      Why staff might use it
                    </h4>
                    <p className="mt-1 text-foreground">{widgetInformation.coachUse}</p>
                  </section>
                  <section>
                    <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      What might influence it
                    </h4>
                    <p className="mt-1 text-foreground">{widgetInformation.influences}</p>
                  </section>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
