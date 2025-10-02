import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Gift, Heart, Star, Zap, Award, Crown, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Rewards = () => {
  const { toast } = useToast();
  const [userPoints, setUserPoints] = useState(3250);

  const badges = [
    { name: "First Rescue", icon: Star, earned: true, description: "Complete your first material pickup", color: "text-yellow-500" },
    { name: "Carbon Hero", icon: Zap, earned: true, description: "Save 100+ kg CO₂", color: "text-green-500" },
    { name: "Community Builder", icon: Heart, earned: true, description: "Donate points to charity", color: "text-pink-500" },
    { name: "Top Recycler", icon: Trophy, earned: false, description: "Reach top 10 on leaderboard", color: "text-blue-500" },
    { name: "Inspection Pro", icon: Award, earned: false, description: "Verify 50 materials", color: "text-purple-500" },
    { name: "Elite Diverter", icon: Crown, earned: false, description: "Divert 500+ materials", color: "text-orange-500" },
  ];

  const rewards = [
    { id: 1, title: "Coffee Voucher", points: 500, category: "Vouchers", icon: Gift, available: true },
    { id: 2, title: "Free Material Pickup", points: 1000, category: "Services", icon: Target, available: true },
    { id: 3, title: "Donate to Local NGO", points: 250, category: "Charity", icon: Heart, available: true },
    { id: 4, title: "Premium Badge", points: 2000, category: "Premium", icon: Crown, available: true },
    { id: 5, title: "$25 Gift Card", points: 2500, category: "Vouchers", icon: Gift, available: true },
    { id: 6, title: "Plant 10 Trees", points: 1500, category: "Charity", icon: Heart, available: true },
  ];

  const handleRedeem = (reward: typeof rewards[0]) => {
    if (userPoints >= reward.points) {
      setUserPoints(userPoints - reward.points);
      toast({
        title: "Reward Redeemed! 🎉",
        description: `You've redeemed ${reward.title}`,
      });
    } else {
      toast({
        title: "Not enough points",
        description: `You need ${reward.points - userPoints} more points`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-12 blueprint-bg paper-texture">
        <div className="container">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold mb-4">Rewards & Badges 🎁</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Earn points for sustainable actions and redeem them for rewards
            </p>
          </div>

          {/* Points Overview */}
          <Card className="max-w-4xl mx-auto mb-12 bg-gradient-to-br from-accent/20 to-cta/20 border-2 border-accent">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Your Points</h2>
                  <p className="text-5xl font-bold text-accent">{userPoints.toLocaleString()}</p>
                </div>
                <Trophy className="h-24 w-24 text-cta animate-float" />
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-background/50 backdrop-blur p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Earned</p>
                  <p className="text-2xl font-bold">5,430</p>
                </div>
                <div className="bg-background/50 backdrop-blur p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Redeemed</p>
                  <p className="text-2xl font-bold">2,180</p>
                </div>
                <div className="bg-background/50 backdrop-blur p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Next Milestone</p>
                  <p className="text-2xl font-bold">5,000</p>
                  <Progress value={(userPoints / 5000) * 100} className="mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="badges" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
              <TabsTrigger value="badges">Badges</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
            </TabsList>

            {/* Badges Tab */}
            <TabsContent value="badges">
              <div className="grid md:grid-cols-3 gap-6">
                {badges.map((badge, i) => {
                  const Icon = badge.icon;
                  return (
                    <Card 
                      key={i}
                      className={`card-lift ${badge.earned ? 'border-2 border-accent' : 'opacity-60'}`}
                    >
                      <CardHeader className="text-center">
                        <div className="mx-auto mb-3 relative">
                          <Icon className={`h-16 w-16 ${badge.earned ? badge.color : 'text-muted-foreground'}`} />
                          {badge.earned && (
                            <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground rounded-full p-1">
                              ✓
                            </div>
                          )}
                        </div>
                        <CardTitle className="text-xl">{badge.name}</CardTitle>
                        <CardDescription>{badge.description}</CardDescription>
                        {badge.earned ? (
                          <Badge variant="default" className="mt-2">Earned</Badge>
                        ) : (
                          <Badge variant="outline" className="mt-2">Locked</Badge>
                        )}
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* Rewards Tab */}
            <TabsContent value="rewards">
              <div className="grid md:grid-cols-3 gap-6">
                {rewards.map((reward) => {
                  const Icon = reward.icon;
                  const canAfford = userPoints >= reward.points;
                  return (
                    <Card key={reward.id} className={`card-lift ${canAfford ? '' : 'opacity-60'}`}>
                      <CardHeader>
                        <div className="flex items-center justify-between mb-3">
                          <Icon className="h-10 w-10 text-accent" />
                          <Badge variant="secondary">{reward.category}</Badge>
                        </div>
                        <CardTitle className="text-lg">{reward.title}</CardTitle>
                        <CardDescription className="text-2xl font-bold text-accent mt-2">
                          {reward.points} pts
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button 
                          onClick={() => handleRedeem(reward)}
                          disabled={!canAfford}
                          className="w-full bg-cta text-cta-foreground hover:bg-cta/90"
                        >
                          {canAfford ? 'Redeem' : `Need ${reward.points - userPoints} more`}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>

          {/* How to Earn Points */}
          <Card className="max-w-4xl mx-auto mt-12">
            <CardHeader>
              <CardTitle>How to Earn Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { action: "List a material", points: "+50" },
                  { action: "Complete a pickup", points: "+100" },
                  { action: "Verify material quality", points: "+25" },
                  { action: "Refer a friend", points: "+200" },
                  { action: "Save 10kg CO₂", points: "+75" },
                  { action: "Monthly community vote", points: "+150" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="font-medium">{item.action}</span>
                    <span className="text-accent font-bold text-lg">{item.points}</span>
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

export default Rewards;
