import Navbar from "@/components/Navbar";
import CarbonCounter from "@/components/CarbonCounter";
import { Leaf, TrendingUp, Users, Award } from "lucide-react";

const Sustainability = () => {
  const achievements = [
    { label: "Materials Diverted", value: "2,400+", icon: TrendingUp, color: "text-cta" },
    { label: "CO₂ Saved", value: "15,420 kg", icon: Leaf, color: "text-success" },
    { label: "Active Users", value: "850+", icon: Users, color: "text-teal" },
    { label: "Waste Reduction", value: "95%", icon: Award, color: "text-accent" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="py-20 blueprint-bg">
        <div className="container text-center">
          <div className="mb-6 flex justify-center">
            <CarbonCounter carbonSaved={15420} />
          </div>
          <h1 className="text-5xl font-bold mb-4">Our Environmental Impact</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track the collective impact of our community in reducing construction waste 
            and saving carbon emissions
          </p>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {achievements.map((achievement, idx) => (
              <div 
                key={idx}
                className="bg-card p-8 rounded-2xl border border-border card-lift text-center"
              >
                <div className={`w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4`}>
                  <achievement.icon className={`h-8 w-8 ${achievement.color}`} />
                </div>
                <div className={`text-4xl font-bold mb-2 ${achievement.color}`}>
                  {achievement.value}
                </div>
                <div className="text-muted-foreground">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Carbon Breakdown */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center">Carbon Savings Breakdown</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              { material: "Steel & Metal", kg: 6200, percentage: 40 },
              { material: "Lumber & Wood", kg: 4500, percentage: 29 },
              { material: "Concrete & Masonry", kg: 2800, percentage: 18 },
              { material: "Fixtures & Equipment", kg: 1920, percentage: 13 },
            ].map((item, idx) => (
              <div key={idx} className="bg-card p-6 rounded-xl border border-border">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-lg">{item.material}</span>
                  <span className="text-2xl font-bold text-success">{item.kg} kg CO₂</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-success to-accent transition-all duration-1000"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  {item.percentage}% of total savings
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Comparison */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto bg-card rounded-2xl p-8 border border-border">
            <h2 className="text-3xl font-bold mb-6 text-center">What Does This Mean?</h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="text-lg">
                <span className="font-bold text-success">15,420 kg of CO₂</span> saved is equivalent to:
              </p>
              <ul className="space-y-3 text-lg ml-6">
                <li className="flex items-start gap-3">
                  <span className="text-success mt-1">✓</span>
                  <span>Driving <strong>38,000 km</strong> in an average car</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-success mt-1">✓</span>
                  <span>Planting <strong>700 trees</strong> and letting them grow for 10 years</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-success mt-1">✓</span>
                  <span>Powering an average home for <strong>21 months</strong></span>
                </li>
              </ul>
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

export default Sustainability;
