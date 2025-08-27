import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { cn } from '@/lib/utils';

interface WalletButtonProps {
  className?: string;
}

export function WalletButton({ className }: WalletButtonProps) {
  return (
    <WalletMultiButton 
      className={cn(
        "!bg-primary hover:!bg-primary/90 !text-primary-foreground",
        "!border-none !rounded-lg !font-medium !text-sm !px-4 !py-2",
        "!transition-colors !duration-200",
        className
      )} 
    />
  );
}