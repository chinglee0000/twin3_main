"use client"

import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Progress } from "./ui/progress"
import type { TwinMatrixData } from "../lib/types/matrix"
import { getDisplayRange, getTraitColor } from "../lib/mock-data/twin-matrix-persona"

function TwinMatrixGrid({ data }: { data: TwinMatrixData }) {
  // 使用 getDisplayRange 函數計算 8x8 顯示範圍
  const displayTraits = data.recentlyUnlockedTrait
    ? getDisplayRange(data.recentlyUnlockedTrait, data.traits)
    : data.traits.slice(0, 64)

  return (
    <div className="grid grid-cols-8 gap-0.5 sm:gap-1 p-2 sm:p-3 bg-muted/20 rounded-lg w-full max-w-[280px] sm:max-w-[320px]">
      {displayTraits.map((trait) => (
        <button
          key={trait.id}
          type="button"
          className="aspect-square rounded-[2px] sm:rounded-sm transition-all active:scale-95 md:hover:scale-110 cursor-pointer touch-manipulation"
          style={{
            backgroundColor: getTraitColor(trait),
            opacity: trait.discovered ? 1 : 0.3,
          }}
          aria-label={trait.name || `Trait ${trait.id}`}
        />
      ))}
    </div>
  )
}

export function TwinMatrixCard({ data }: { data: TwinMatrixData }) {
  return (
    <Card className="bg-transparent border-0 shadow-none sm:rounded-lg sm:border sm:bg-card sm:shadow-sm overflow-hidden">
      <CardHeader className="px-4 sm:px-6 pb-3 sm:pb-6">
        <CardTitle className="flex items-center gap-2 text-xl sm:text-lg font-semibold">
          <span>Twin Matrix Growth</span>
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm font-normal">
          {data.discoveredTraits} / {data.totalTraits} Traits Discovered
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6">
        {/* Twin Matrix Completion */}
        <div>
          <div className="flex justify-between text-xs sm:text-sm mb-1.5 sm:mb-2">
            <span className="text-muted-foreground font-normal">Twin Matrix Completion</span>
            <span className="font-medium">{data.journeyProgress}%</span>
          </div>
          <Progress value={data.journeyProgress} className="h-1.5 sm:h-2" />
        </div>

        {/* Matrix Grid + Dimension Progress (僅平板左右並排) */}
        <div className="grid sm:grid-cols-2 md:grid-cols-1 gap-3 sm:gap-6 md:gap-4">
          {/* Matrix Grid Visualization */}
          <div className="flex justify-center sm:justify-start md:justify-center">
            <TwinMatrixGrid data={data} />
          </div>

          {/* Dimension Progress Bars - 手機 2x2，平板垂直，PC 垂直 */}
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-y-4 md:gap-y-3">
            {Object.entries(data.dimensions).map(([key, dim]) => {
              const colorMap = {
                physical: 'hsl(var(--matrix-physical))',
                social: 'hsl(var(--matrix-social))',
                digital: 'hsl(var(--matrix-digital))',
                spiritual: 'hsl(var(--matrix-spiritual))',
              }
              const color = colorMap[key as keyof typeof colorMap]
              const label = key.charAt(0).toUpperCase() + key.slice(1)
              const percentage = Math.round((dim.discovered / dim.total) * 100)

              return (
                <div key={key}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium text-foreground">
                      {label}
                    </span>
                    <span className="text-muted-foreground font-normal">
                      {dim.discovered}/{dim.total}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 sm:h-2 bg-muted/50 rounded-full overflow-hidden">
                      <div
                        className="h-full transition-all"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: color,
                        }}
                      />
                    </div>
                    <span className="font-medium text-foreground text-xs min-w-[32px] text-right">
                      {percentage}%
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Explore Button */}
        <a
          href="/user/matrix"
          className="group flex items-center justify-center gap-2 rounded-lg bg-primary/10 hover:bg-primary/20 px-3 py-2.5 sm:px-4 sm:py-3 text-sm font-semibold text-primary transition-colors"
        >
          Explore Your Matrix
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </CardContent>
    </Card>
  )
}

