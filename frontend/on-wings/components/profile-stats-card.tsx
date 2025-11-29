import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

export const ProfileStatsCard = ({ totalScore, title, icon, className, pointsText }: { totalScore: string | number, title: string, icon: React.ReactNode, className: string, pointsText: string }) => {
    return (
        <Card className={className}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-md font-medium text-foreground">
                {title}
              </CardTitle>
              {icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {totalScore}
              </div>
              <p className="text-xs text-foreground/80">
                {pointsText}
              </p>
           </CardContent>
          </Card>
    )
}