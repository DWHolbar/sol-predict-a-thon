import { MarketCard } from "@/components/ui/market-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, TrendingUp } from "lucide-react";
import { useState } from "react";

interface Market {
  id: string;
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
}

const SAMPLE_MARKETS: Market[] = [
  {
    id: "1",
    title: "Will Bitcoin reach $100,000 by end of 2024?",
    description: "Market resolves based on CoinGecko price data at 11:59 PM UTC on December 31, 2024.",
    category: "Crypto",
    yesPrice: 3.2,
    noPrice: 1.8,
    volume: "$124.5K",
    participants: 2847,
    endDate: "Dec 31",
    trending: "up",
    featured: true
  },
  {
    id: "2", 
    title: "Enhanced Games Las Vegas 2025 will happen as scheduled",
    description: "Will the controversial pro-doping Enhanced Games take place in Las Vegas during Memorial Day 2025?",
    category: "Sports",
    yesPrice: 2.1,
    noPrice: 2.9,
    volume: "$89.3K",
    participants: 1523,
    endDate: "May 26",
    trending: "neutral"
  },
  {
    id: "3",
    title: "US Presidential Election Winner 2024",
    description: "Market resolves based on official election results certified by states.",
    category: "Politics", 
    yesPrice: 1.9,
    noPrice: 3.1,
    volume: "$456.7K",
    participants: 5234,
    endDate: "Nov 5",
    trending: "up",
    featured: true
  },
  {
    id: "4",
    title: "Will a new memecoin reach top 10 by market cap in 2024?",
    description: "Any memecoin launched after Jan 1, 2024 reaching top 10 on CoinMarketCap resolves YES.",
    category: "Crypto",
    yesPrice: 4.2,
    noPrice: 0.8,
    volume: "$67.8K",
    participants: 892,
    endDate: "Dec 31",
    trending: "down"
  },
  {
    id: "5",
    title: "WNBA controversies will lead to rule changes",
    description: "Will recent incidents lead to new WNBA regulations by end of 2024?",
    category: "Sports",
    yesPrice: 2.8,
    noPrice: 2.2,
    volume: "$34.5K",
    participants: 445,
    endDate: "Dec 15",
    trending: "up"
  },
  {
    id: "6",
    title: "Solana will flip Ethereum by transaction count",
    description: "Will Solana exceed Ethereum's daily transaction count consistently for 30 days?",
    category: "Crypto",
    yesPrice: 1.5,
    noPrice: 3.5,
    volume: "$203.4K",
    participants: 3456,
    endDate: "Q4 2024",
    trending: "neutral"
  }
];

const CATEGORIES = ["All", "Crypto", "Sports", "Politics", "Tech", "Entertainment"];

export function MarketGrid() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filteredMarkets = SAMPLE_MARKETS.filter(market => {
    const matchesSearch = market.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         market.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || market.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <TrendingUp className="h-6 w-6 text-primary" />
            <Badge variant="outline">Live Markets</Badge>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Active Prediction Markets
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover trending markets and place your bets on future outcomes
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search markets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="sm:w-auto"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Category Filter */}
          {showFilters && (
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Markets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredMarkets.map((market) => (
            <MarketCard
              key={market.id}
              title={market.title}
              description={market.description}
              category={market.category}
              yesPrice={market.yesPrice}
              noPrice={market.noPrice}
              volume={market.volume}
              participants={market.participants}
              endDate={market.endDate}
              trending={market.trending}
              featured={market.featured}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Markets
          </Button>
        </div>
      </div>
    </section>
  );
}