import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MaterialCard from "@/components/MaterialCard";
import { Recycle, Zap, Shield, TrendingUp, Users, Award, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import stickerImage from "@/assets/material-stickers.png";

const Home = () => {
  // Mock data for featured materials
  const featuredMaterials = [
    {
      id: "1",
      title: "Reclaimed Oak Planks",
      category: "Lumber",
      images: ["https://images.unsplash.com/photo-1606744837616-56c9a5c6c00c?w=400"],
      qualityScore: 0.92,
      distanceKm: 3.2,
      carbonSavedKg: 45,
      condition: "excellent" as const,
      verified: true,
    },
    {
      id: "2",
      title: "Steel I-Beams",
      category: "Metal",
      images: ["https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=400"],
      qualityScore: 0.88,
      distanceKm: 5.8,
      carbonSavedKg: 120,
      condition: "good" as const,
      verified: true,
    },
    {
      id: "3",
      title: "Industrial Light Fixtures",
      category: "Fixtures",
      images: ["https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400"],
      qualityScore: 0.76,
      distanceKm: 2.1,
      carbonSavedKg: 18,
      condition: "repairable" as const,
      verified: false,
    },
  ];

  const features = [
    {
      icon: Zap,
      title: "AI-Powered Verification",
      description: "Smart image recognition assesses quality and authenticity instantly",
    },
    {
      icon: Recycle,
      title: "Real-Time Matching",
      description: "Connect surplus with demand using intelligent logistics coordination",
    },
    {
      icon: Shield,
      title: "Verified Suppliers",
      description: "Multi-step verification ensures trust and transparency in every transaction",
    },
    {
      icon: TrendingUp,
      title: "Impact Tracking",
      description: "Measure carbon savings and environmental impact with every material reused",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">How ReclaimNet Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From waste to resource in four simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div 
                key={idx}
                className="bg-card p-6 rounded-2xl border border-border card-lift"
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Material Categories with Dustbins */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Material Categories</h2>
            <p className="text-xl text-muted-foreground">Sort, collect, and reuse with our smart bins</p>
          </div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: "Lumber", color: "bg-secondary", count: 340 },
              { name: "Metal", color: "bg-accent", count: 285 },
              { name: "Fixtures", color: "bg-cta", count: 192 },
              { name: "Concrete", color: "bg-muted", count: 167 },
              { name: "Tiles", color: "bg-teal", count: 143 },
              { name: "Electrical", color: "bg-success", count: 98 },
              { name: "Plumbing", color: "bg-primary", count: 76 },
              { name: "Glass", color: "bg-accent", count: 54 },
            ].map((cat, i) => (
              <Card key={i} className="card-lift overflow-hidden group cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className={`mx-auto w-20 h-24 ${cat.color} rounded-lg mb-4 relative transition-transform group-hover:scale-110`}>
                    <Trash2 className="absolute inset-0 m-auto h-10 w-10 text-white" />
                    <div className="absolute -top-2 -right-2">
                      <Badge className="bg-background text-foreground">{cat.count}</Badge>
                    </div>
                  </div>
                  <h3 className="font-bold text-lg">{cat.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Materials */}
      <section className="py-20 blueprint-bg relative">
        {/* Decorative Sticker */}
        <div className="absolute top-10 right-10 animate-float opacity-20">
          <img src={stickerImage} alt="" className="w-32 h-32" />
        </div>
        
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-2">Featured Materials</h2>
              <p className="text-xl text-muted-foreground">
                Recently listed and ready for pickup
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredMaterials.map((material) => (
              <MaterialCard key={material.id} {...material} />
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 bg-gradient-to-br from-accent/10 via-background to-cta/10">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Be part of a movement that's transforming construction waste into valuable resources
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="card-lift bg-card/50 backdrop-blur">
              <CardContent className="pt-6 text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-accent" />
                <h3 className="text-2xl font-bold mb-2">1,200+</h3>
                <p className="text-muted-foreground">Active Members</p>
              </CardContent>
            </Card>
            
            <Card className="card-lift bg-card/50 backdrop-blur">
              <CardContent className="pt-6 text-center">
                <Award className="h-12 w-12 mx-auto mb-4 text-cta" />
                <h3 className="text-2xl font-bold mb-2">850</h3>
                <p className="text-muted-foreground">Badges Earned</p>
              </CardContent>
            </Card>
            
            <Card className="card-lift bg-card/50 backdrop-blur">
              <CardContent className="pt-6 text-center">
                <Recycle className="h-12 w-12 mx-auto mb-4 text-success" />
                <h3 className="text-2xl font-bold mb-2">98%</h3>
                <p className="text-muted-foreground">Satisfaction Rate</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Together, we're building a sustainable future
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-cta mb-2">15,420</div>
              <div className="text-lg opacity-80">kg CO₂ Saved</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-cta mb-2">2,400+</div>
              <div className="text-lg opacity-80">Materials Listed</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-cta mb-2">1,850</div>
              <div className="text-lg opacity-80">Successful Matches</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-cta mb-2">95%</div>
              <div className="text-lg opacity-80">Waste Diverted</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container text-center text-muted-foreground">
          <p>© 2025 ReclaimNet. Build. Divert. Reuse™</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
