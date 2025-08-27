import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, Menu, X, BarChart3, Plus, User, TrendingUp } from "lucide-react";
import { useState } from "react";
import solanaIcon from "@/assets/solana-icon.png";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const connectWallet = () => setIsConnected(!isConnected);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={solanaIcon} alt="Solana" className="h-8 w-8" />
            <div className="font-bold text-xl gradient-text">SolPredict</div>
            <Badge variant="secondary" className="hidden sm:inline-flex">
              Beta
            </Badge>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#markets" className="text-foreground hover:text-primary transition-colors">
              Markets
            </a>
            <a href="#portfolio" className="text-foreground hover:text-primary transition-colors">
              Portfolio
            </a>
            <a href="#leaderboard" className="text-foreground hover:text-primary transition-colors">
              Leaderboard
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              About
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Create Market
            </Button>
            
            {!isConnected ? (
              <Button onClick={connectWallet} className="glow-primary">
                <Wallet className="h-4 w-4 mr-2" />
                Connect Wallet
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  8Ab...x9Z
                </Button>
                <div className="text-sm text-muted-foreground">
                  1,247.50 SOL
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/50 py-4 space-y-4">
            <div className="flex flex-col space-y-3">
              <a href="#markets" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                <BarChart3 className="h-4 w-4" />
                Markets
              </a>
              <a href="#portfolio" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                <TrendingUp className="h-4 w-4" />
                Portfolio
              </a>
              <a href="#leaderboard" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                <User className="h-4 w-4" />
                Leaderboard
              </a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors">
                About
              </a>
            </div>
            
            <div className="pt-4 border-t border-border/50 space-y-3">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Plus className="h-4 w-4 mr-2" />
                Create Market
              </Button>
              
              {!isConnected ? (
                <Button onClick={connectWallet} className="w-full">
                  <Wallet className="h-4 w-4 mr-2" />
                  Connect Wallet
                </Button>
              ) : (
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <User className="h-4 w-4 mr-2" />
                    8Ab...x9Z
                  </Button>
                  <div className="text-center text-sm text-muted-foreground">
                    Balance: 1,247.50 SOL
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}