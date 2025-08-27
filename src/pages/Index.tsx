import { Navbar } from "@/components/ui/navbar";
import { HeroSection } from "@/components/ui/hero-section";
import { MarketGrid } from "@/components/ui/market-grid";
import { Footer } from "@/components/ui/footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <section id="markets">
          <MarketGrid />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
