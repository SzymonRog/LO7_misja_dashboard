import { Badge } from "@/components/ui/badge"
import DashboardCard from "@/components/dashboard/card"
import type { CorruptionTarget } from "@/types/dashboard"
import { cn } from "@/lib/utils"

interface TargetsListProps {
  targets: CorruptionTarget[]
}

export default function TargetsList({ targets }: TargetsListProps) {
  const getThreatColor = (threat: string) => {
    switch (threat) {
      case "KRYTYCZNA":
        return "bg-destructive text-destructive-foreground"
      case "WYSOKA":
        return "bg-warning text-warning-foreground"
      case "ŚREDNIA":
        return "bg-accent text-accent-foreground"
      case "NISKA":
        return "bg-secondary text-secondary-foreground"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  return (
    <DashboardCard title="NASTĘPNE CELE" intent="default" addon={<Badge variant="outline-warning">4 AKTYWNE</Badge>}>
      <div className="space-y-4">
        {targets.map((target) => (
          <div
            key={target.id}
            className="flex items-start gap-3 p-3 rounded-lg bg-accent border border-pop hover:border-primary transition-colors"
          >
            <div className="flex-shrink-0">
              <div className={cn("rounded px-2.5 py-1.5 text-sm font-bold", getThreatColor(target.threat))}>
                {target.priority}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="font-display text-lg text-foreground">{target.name}</h3>
                <Badge variant="outline" className="text-xs">
                  {target.category}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{target.details}</p>
              <div className="flex items-center justify-between gap-2 text-xs">
                <Badge variant="secondary">{target.threat}</Badge>
                <span className="text-muted-foreground italic">{target.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  )
}
