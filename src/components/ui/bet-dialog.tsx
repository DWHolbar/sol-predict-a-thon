import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { PublicKey } from "@solana/web3.js";
import { usePredictionMarket } from "@/hooks/usePredictionMarket";
import { useSolana } from "@/hooks/useSolana";
import { formatSOL } from "@/lib/solana";

interface BetDialogProps {
  marketPDA: PublicKey;
  marketTitle: string;
  isYesBet: boolean;
  currentPrice: number;
  children: React.ReactNode;
}

export function BetDialog({ marketPDA, marketTitle, isYesBet, currentPrice, children }: BetDialogProps) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  
  const { placeBet, loading } = usePredictionMarket();
  const { connected, publicKey } = useSolana();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      return;
    }

    const result = await placeBet(marketPDA, amount, isYesBet);
    
    if (result) {
      setOpen(false);
      setAmount("");
    }
  };

  const estimatedTokens = amount ? (parseFloat(amount) / currentPrice).toFixed(2) : "0";
  const potentialReturn = amount ? (parseFloat(amount) / currentPrice * 1).toFixed(2) : "0";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Place {isYesBet ? "YES" : "NO"} Bet
          </DialogTitle>
          <DialogDescription>
            {marketTitle}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="amount">Amount (SOL)</Label>
              <Badge variant={isYesBet ? "default" : "destructive"}>
                {isYesBet ? "YES" : "NO"} @ {currentPrice.toFixed(2)}¢
              </Badge>
            </div>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0.1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          
          {amount && (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated tokens:</span>
                <span>{estimatedTokens}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Potential return:</span>
                <span className="text-market-bull">{potentialReturn} SOL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Max profit:</span>
                <span className="text-market-bull">
                  {(parseFloat(potentialReturn) - parseFloat(amount)).toFixed(2)} SOL
                </span>
              </div>
            </div>
          )}
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading || !connected || !amount}
              className={isYesBet ? "bg-market-bull hover:bg-market-bull/90" : "bg-market-bear hover:bg-market-bear/90"}
            >
              {loading ? "Placing..." : `Buy ${isYesBet ? "YES" : "NO"}`}
            </Button>
          </div>
          
          {!connected && (
            <p className="text-sm text-muted-foreground text-center">
              Connect your wallet to place bets
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}