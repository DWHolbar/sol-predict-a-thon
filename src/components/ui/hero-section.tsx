import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BarChart3, TrendingUp, Zap } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 container px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex">
            <Badge variant="outline" className="px-4 py-2 text-sm font-medium glass-effect">
              <Zap className="h-4 w-4 mr-2" />
              Powered by Solana
            </Badge>
          </div>

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Predict the{" "}
              <span className="gradient-text">Future</span>
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold text-muted-foreground">
              Trade Your Insights
            </h2>
          </div>

          {/* Description */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The first decentralized prediction market on Solana. 
            Bet on real-world events and earn from your knowledge.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="glass-effect rounded-lg p-6">
              <div className="text-3xl font-bold text-primary">$2.4M</div>
              <div className="text-sm text-muted-foreground">Total Volume</div>
            </div>
            <div className="glass-effect rounded-lg p-6">
              <div className="text-3xl font-bold text-accent">12.5K</div>
              <div className="text-sm text-muted-foreground">Active Traders</div>
            </div>
            <div className="glass-effect rounded-lg p-6">
              <div className="text-3xl font-bold text-market-neutral">847</div>
              <div className="text-sm text-muted-foreground">Live Markets</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="px-8 py-6 text-lg glow-primary">
              <BarChart3 className="mr-2 h-5 w-5" />
              Explore Markets
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-6 text-lg glass-effect">
              <TrendingUp className="mr-2 h-5 w-5" />
              Create Market
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <div className="inline-flex p-3 bg-primary/10 rounded-full">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">
                Instant trades on Solana's high-speed blockchain
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="inline-flex p-3 bg-accent/10 rounded-full">
                <BarChart3 className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold">Real Markets</h3>
              <p className="text-sm text-muted-foreground">
                Trade on actual events with real outcomes
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="inline-flex p-3 bg-market-bull/10 rounded-full">
                <TrendingUp className="h-6 w-6 text-market-bull" />
              </div>
              <h3 className="font-semibold">Earn Rewards</h3>
              <p className="text-sm text-muted-foreground">
                Get rewarded for accurate predictions
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}