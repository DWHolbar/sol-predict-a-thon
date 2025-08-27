import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BetDialog } from "@/components/ui/bet-dialog";
import { TrendingUp, TrendingDown, Clock, Users } from "lucide-react";
import { PublicKey } from "@solana/web3.js";
import { cn } from "@/lib/utils";

interface MarketCardProps {
  id?: PublicKey;
  title: string;
  description: string;
  category: string;
  yesPrice: number;
  noPrice: number;
  volume: string;
  participants: number;
  endDate: string;
  trending?: "up" | "down" | "neutral";
  featured?: boolean;
  className?: string;
}

const MarketCard = React.forwardRef<HTMLDivElement, MarketCardProps>(
  ({
    id,
    title,
    description,
    category,
    yesPrice,
    noPrice,
    volume,
    participants,
    endDate,
    trending = "neutral",
    featured = false,
    className,
    ...props
  }, ref) => {
    const yesPercentage = (yesPrice / (yesPrice + noPrice)) * 100;
    const noPercentage = 100 - yesPercentage;

    return (
      <Card
        ref={ref}
        className={cn(
          "group relative overflow-hidden transition-all duration-300",
          "hover:shadow-lg hover:-translate-y-1",
          featured && "ring-2 ring-primary/50 animate-glow-pulse",
          className
        )}
        {...props}
      >
        {featured && (
          <div className="absolute top-3 right-3">
            <Badge variant="default" className="bg-gradient-to-r from-primary to-accent">
              Featured
            </Badge>
          </div>
        )}
        
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{category}</Badge>
                {trending === "up" && <TrendingUp className="h-4 w-4 text-market-bull" />}
                {trending === "down" && <TrendingDown className="h-4 w-4 text-market-bear" />}
              </div>
              <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                {title}
              </CardTitle>
              <CardDescription className="line-clamp-2 mt-1">
                {description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-market-bull font-medium">YES {yesPercentage.toFixed(0)}%</span>
              <span className="text-market-bear font-medium">NO {noPercentage.toFixed(0)}%</span>
            </div>
            <Progress value={yesPercentage} className="h-2" />
          </div>

          <div className="flex justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {participants} traders
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {endDate}
            </div>
          </div>

          <div className="text-sm">
            <span className="text-muted-foreground">Volume: </span>
            <span className="font-medium">{volume}</span>
          </div>

          <div className="flex gap-2 pt-2">
            {id ? (
              <>
                <BetDialog
                  marketPDA={id}
                  marketTitle={title}
                  isYesBet={true}
                  currentPrice={yesPrice}
                >
                  <Button variant="outline" size="sm" className="flex-1 border-market-bull/20 hover:bg-market-bull/10">
                    Buy YES
                  </Button>
                </BetDialog>
                <BetDialog
                  marketPDA={id}
                  marketTitle={title}
                  isYesBet={false}
                  currentPrice={noPrice}
                >
                  <Button variant="outline" size="sm" className="flex-1 border-market-bear/20 hover:bg-market-bear/10">
                    Buy NO
                  </Button>
                </BetDialog>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" className="flex-1 border-market-bull/20 hover:bg-market-bull/10">
                  Buy YES
                </Button>
                <Button variant="outline" size="sm" className="flex-1 border-market-bear/20 hover:bg-market-bear/10">
                  Buy NO
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);

MarketCard.displayName = "MarketCard";

export { MarketCard };