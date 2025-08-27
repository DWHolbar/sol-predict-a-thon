import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Twitter, MessageCircle, ExternalLink } from "lucide-react";
import solanaIcon from "@/assets/solana-icon.png";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={solanaIcon} alt="Solana" className="h-8 w-8" />
              <div className="font-bold text-xl gradient-text">SolPredict</div>
            </div>
            <p className="text-muted-foreground text-sm">
              The first decentralized prediction market on Solana. 
              Trade your insights on real-world events.
            </p>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Built on Solana</Badge>
              <Badge variant="secondary">Beta</Badge>
            </div>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h3 className="font-semibold">Platform</h3>
            <div className="space-y-2 text-sm">
              <a href="#markets" className="block text-muted-foreground hover:text-primary transition-colors">
                Browse Markets
              </a>
              <a href="#create" className="block text-muted-foreground hover:text-primary transition-colors">
                Create Market
              </a>
              <a href="#portfolio" className="block text-muted-foreground hover:text-primary transition-colors">
                My Portfolio
              </a>
              <a href="#leaderboard" className="block text-muted-foreground hover:text-primary transition-colors">
                Leaderboard
              </a>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold">Resources</h3>
            <div className="space-y-2 text-sm">
              <a href="#docs" className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                Documentation
                <ExternalLink className="h-3 w-3" />
              </a>
              <a href="#api" className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                API Reference
                <ExternalLink className="h-3 w-3" />
              </a>
              <a href="#help" className="block text-muted-foreground hover:text-primary transition-colors">
                Help Center
              </a>
              <a href="#terms" className="block text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="font-semibold">Community</h3>
            <div className="space-y-3">
              <Button variant="ghost" size="sm" className="w-full justify-start p-0 h-auto">
                <Twitter className="h-4 w-4 mr-2" />
                <span className="text-sm">Follow on Twitter</span>
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start p-0 h-auto">
                <MessageCircle className="h-4 w-4 mr-2" />
                <span className="text-sm">Join Discord</span>
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start p-0 h-auto">
                <Github className="h-4 w-4 mr-2" />
                <span className="text-sm">GitHub</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 SolPredict. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-primary transition-colors">
              Terms
            </a>
            <a href="#security" className="hover:text-primary transition-colors">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}