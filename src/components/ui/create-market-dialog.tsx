import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { usePredictionMarket } from "@/hooks/usePredictionMarket";
import { useSolana } from "@/hooks/useSolana";

export function CreateMarketDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [endDate, setEndDate] = useState<Date>();
  
  const { createMarket, loading } = usePredictionMarket();
  const { connected } = useSolana();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !category || !endDate) {
      return;
    }

    const result = await createMarket(title, description, category, endDate);
    
    if (result) {
      setOpen(false);
      setTitle("");
      setDescription("");
      setCategory("");
      setEndDate(undefined);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="glass-effect">
          <Plus className="mr-2 h-4 w-4" />
          Create Market
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create Prediction Market</DialogTitle>
          <DialogDescription>
            Create a new prediction market for others to trade on.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Market Title</Label>
            <Input
              id="title"
              placeholder="Will Bitcoin reach $100k by end of 2024?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the market conditions and resolution criteria..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="crypto">Crypto</SelectItem>
                <SelectItem value="politics">Politics</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="economics">Economics</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : "Pick an end date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading || !connected}
              className="glow-primary"
            >
              {loading ? "Creating..." : "Create Market"}
            </Button>
          </div>
          
          {!connected && (
            <p className="text-sm text-muted-foreground text-center">
              Connect your wallet to create markets
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}