import Navbar from "@/components/Navbar";
import { Heart, Users, Target, Award } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Community First",
      description: "Building connections between construction sites and local communities to create shared value."
    },
    {
      icon: Users,
      title: "Inclusive Growth",
      description: "Supporting informal waste workers with digital IDs and fair compensation systems."
    },
    {
      icon: Target,
      title: "Impact Driven",
      description: "Every material saved is tracked, measured, and celebrated for its environmental benefit."
    },
    {
      icon: Award,
      title: "Trust & Transparency",
      description: "AI verification and blockchain records ensure every transaction is authentic and traceable."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 blueprint-bg">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">About ReclaimNet</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Turning construction leftovers into low-cost resources. We connect sites with 
              surplus to those who need materials, using AI to verify quality and smart logistics 
              to move things fast.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-center">Our Story</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p>
                ReclaimNet started when a small renovation project dumped pallets of perfectly 
                usable timber into a landfill — while across town, a community center paid for 
                new lumber. We realized the problem wasn't scarcity, it was connection.
              </p>
              <p>
                We built a platform that blends practical tech (image verification, route 
                optimization) with community care (digital IDs for waste workers, charity 
                donations, and local competitions). Our story is rooted in craft: salvaging 
                value, honoring labor, and measuring impact.
              </p>
              <p className="text-xl font-semibold text-foreground">
                We're here to make reuse effortless, trusted, and rewarding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <div 
                key={idx}
                className="bg-card p-6 rounded-2xl border border-border card-lift text-center"
              >
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl leading-relaxed opacity-90">
              To reduce landfill waste, support local economies, and measure the environmental 
              impact of every match. We believe in turning the construction industry's waste 
              problem into a resource opportunity — one material at a time.
            </p>
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

export default About;
