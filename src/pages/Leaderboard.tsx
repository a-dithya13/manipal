import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, TrendingUp, Zap, Heart } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Leaderboard = () => {
  const topUsers = [
    { rank: 1, name: "Sarah Chen", points: 12450, co2Saved: 2340, materials: 145, badge: "Carbon Hero", icon: Trophy, color: "text-yellow-500" },
    { rank: 2, name: "Mike Rodriguez", points: 11200, co2Saved: 2100, materials: 132, badge: "Top Recycler", icon: Medal, color: "text-gray-400" },
    { rank: 3, name: "Emma Thompson", points: 9850, co2Saved: 1850, materials: 118, badge: "Community Builder", icon: Award, color: "text-amber-600" },
  ];

  const otherUsers = [
    { rank: 4, name: "James Wilson", points: 8900, co2Saved: 1650, materials: 98 },
    { rank: 5, name: "Lisa Park", points: 7500, co2Saved: 1420, materials: 87 },
    { rank: 6, name: "David Kumar", points: 6800, co2Saved: 1280, materials: 76 },
    { rank: 7, name: "Ana Garcia", points: 6200, co2Saved: 1150, materials: 69 },
    { rank: 8, name: "Tom Anderson", points: 5400, co2Saved: 980, materials: 54 },
  ];

  const categories = [
    { title: "Most Materials Diverted", icon: TrendingUp, winner: "Sarah Chen", value: "145 items" },
    { title: "Highest CO₂ Saved", icon: Zap, winner: "Sarah Chen", value: "2,340 kg" },
    { title: "Community Points Donated", icon: Heart, winner: "Emma Thompson", value: "3,200 pts" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-12 blueprint-bg paper-texture">
        <div className="container">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold mb-4">Community Leaderboard 🏆</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Celebrating our champions of sustainability and waste reduction
            </p>
          </div>

          {/* Top 3 Podium */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
            {topUsers.map((user) => {
              const Icon = user.icon;
              return (
                <Card 
                  key={user.rank}
                  className={`card-lift ${user.rank === 1 ? 'md:scale-105 border-2 border-cta shadow-2xl' : ''}`}
                >
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 relative">
                      <Icon className={`h-16 w-16 ${user.color}`} />
                      <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold">
                        {user.rank}
                      </div>
                    </div>
                    <CardTitle className="text-2xl">{user.name}</CardTitle>
                    <Badge variant="secondary" className="mt-2">{user.badge}</Badge>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-accent">{user.points.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Total Points</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div className="text-center">
                        <div className="font-bold text-success">{user.co2Saved} kg</div>
                        <div className="text-xs text-muted-foreground">CO₂ Saved</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-cta">{user.materials}</div>
                        <div className="text-xs text-muted-foreground">Materials</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Category Winners */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <Card key={i} className="card-lift bg-gradient-to-br from-accent/10 to-transparent">
                  <CardContent className="pt-6">
                    <Icon className="h-8 w-8 text-accent mb-3" />
                    <h3 className="font-bold mb-2">{cat.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{cat.winner}</p>
                    <p className="text-2xl font-bold text-accent">{cat.value}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Rest of Rankings */}
          <Card className="max-w-5xl mx-auto">
            <CardHeader>
              <CardTitle>Full Rankings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {otherUsers.map((user) => (
                  <div 
                    key={user.rank}
                    className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-bold text-muted-foreground w-8">#{user.rank}</div>
                      <Avatar>
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.materials} materials diverted</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-accent">{user.points.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">{user.co2Saved} kg CO₂</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Leaderboard;
