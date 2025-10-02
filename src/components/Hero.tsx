import { ArrowRight, Search, Upload, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CarbonCounter from "./CarbonCounter";
import heroImage from "@/assets/hero-construction.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center blueprint-bg paper-texture">
      <div className="container grid lg:grid-cols-2 gap-12 items-center py-12">
        {/* Left Content */}
        <div className="space-y-6">
          <div className="inline-block">
            <CarbonCounter />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Build. Divert. Reuse<span className="text-accent">™</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-xl">
            Turn construction waste into tomorrow's materials. AI-powered marketplace 
            connecting surplus materials with those who need them.
          </p>

          {/* Quick Search */}
          <div className="flex flex-col sm:flex-row gap-3 p-4 bg-card rounded-2xl shadow-lg border border-border">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search materials..." 
                className="pl-10 border-none bg-muted/50"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <MapPin className="h-5 w-5" />
              </Button>
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                Search
              </Button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 pt-4">
            <Link to="/list-material">
              <Button className="bg-cta text-cta-foreground hover:bg-cta/90 text-lg px-8 py-6">
                <Upload className="mr-2 h-5 w-5" />
                List Material
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button variant="outline" className="text-lg px-8 py-6">
                Browse Marketplace
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-4 pt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span>AI-Verified Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span>Real-time Matching</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span>Carbon Tracked</span>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative hidden lg:block">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl animate-float">
            <img 
              src={heroImage} 
              alt="Construction materials ready for reuse"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            
            {/* Floating Stats */}
            <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-3">
              <div className="bg-card/90 backdrop-blur-sm rounded-xl p-3 border border-border">
                <div className="text-2xl font-bold text-accent">2.4k+</div>
                <div className="text-xs text-muted-foreground">Materials</div>
              </div>
              <div className="bg-card/90 backdrop-blur-sm rounded-xl p-3 border border-border">
                <div className="text-2xl font-bold text-cta">95%</div>
                <div className="text-xs text-muted-foreground">Diverted</div>
              </div>
              <div className="bg-card/90 backdrop-blur-sm rounded-xl p-3 border border-border">
                <div className="text-2xl font-bold text-success">12h</div>
                <div className="text-xs text-muted-foreground">Avg Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
