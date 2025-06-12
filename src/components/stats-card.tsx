import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingDown, TrendingUp, type LucideIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface StatCardProps {
  title: string;
  value: string | number;
  trend: "up" | "down" | "neutral";
  percentage?: string;
  description: string;
  icon?: LucideIcon;
  isLoading?: boolean;
}

export function StatCard({
  title,
  value,
  trend,
  percentage,
  description,
  icon: Icon,
  isLoading,
}: StatCardProps) {
  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown;

  if (isLoading) {
    return (
      <Card className="@container/card">
        <CardHeader>
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-32 @[250px]/card:h-10" />
          <CardAction>
            <Skeleton className="h-6 w-16" />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-4" />
          </div>
          <Skeleton className="h-4 w-40" />
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {value}
        </CardTitle>
        {percentage && (
          <CardAction>
            <Badge
              variant="outline"
              className={
                trend === "up"
                  ? "text-green-600"
                  : trend === "down"
                  ? "text-red-600"
                  : ""
              }
            >
              <TrendIcon className="mr-1 h-3.5 w-3.5" />
              {percentage}
            </Badge>
          </CardAction>
        )}
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          {Icon ? <Icon className="size-4" /> : null}
          {description}
          <TrendIcon className="size-4" />
        </div>
        <div className="text-muted-foreground">
          {trend === "up"
            ? "Trending up this month"
            : trend === "down"
            ? "Trending down this month"
            : "Stable this month"}
        </div>
      </CardFooter>
    </Card>
  );
}
