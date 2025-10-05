import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Calendar, Package, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Request = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    materialType: "",
    quantity: "",
    location: "",
    deadline: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3001/api/requests', { // Assuming backend runs on port 3001
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Request submitted successfully:', result);

      toast({
        title: "Request Submitted! 🎉",
        description: "We're searching for matching materials nearby...",
      });

      // Optionally clear form after successful submission
      setFormData({
        materialType: "",
        quantity: "",
        location: "",
        deadline: "",
        description: "",
      });

    } catch (error) {
      console.error('Error submitting request:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-12 blueprint-bg">
        <div className="container">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold mb-4">Request Materials</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tell us what you need. Our AI will match you with nearby surplus materials in real-time.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Request Form */}
            <Card className="card-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-accent" />
                  Material Request Form
                </CardTitle>
                <CardDescription>
                  Fill in the details and we'll find matches automatically
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="materialType">Material Type</Label>
                    <Select 
                      value={formData.materialType} 
                      onValueChange={(value) => setFormData({...formData, materialType: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select material type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lumber">Lumber & Wood</SelectItem>
                        <SelectItem value="metal">Metal & Steel</SelectItem>
                        <SelectItem value="fixtures">Fixtures & Fittings</SelectItem>
                        <SelectItem value="concrete">Concrete</SelectItem>
                        <SelectItem value="tiles">Tiles & Flooring</SelectItem>
                        <SelectItem value="electrical">Electrical</SelectItem>
                        <SelectItem value="plumbing">Plumbing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity Needed</Label>
                    <Input 
                      id="quantity"
                      placeholder="e.g., 50 units, 100 kg"
                      value={formData.quantity}
                      onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="location"
                        className="pl-10"
                        placeholder="Enter your location"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deadline">Needed By</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="deadline"
                        type="date"
                        className="pl-10"
                        value={formData.deadline}
                        onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Additional Details</Label>
                    <Textarea 
                      id="description"
                      placeholder="Describe your project and specific requirements..."
                      className="min-h-[100px]"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-cta text-cta-foreground hover:bg-cta/90">
                    <Search className="mr-2 h-5 w-5" />
                    Find Materials
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* AI Matching Info */}
            <div className="space-y-6">
              <Card className="bg-accent text-accent-foreground">
                <CardHeader>
                  <CardTitle>🤖 AI-Powered Matching</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-white mt-2" />
                    <div>
                      <p className="font-semibold">Instant Search</p>
                      <p className="text-sm opacity-90">Our AI scans thousands of listings in seconds</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-white mt-2" />
                    <div>
                      <p className="font-semibold">Smart Distance Matching</p>
                      <p className="text-sm opacity-90">Prioritizes nearby materials to reduce transport emissions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-white mt-2" />
                    <div>
                      <p className="font-semibold">Quality Verified</p>
                      <p className="text-sm opacity-90">All materials are AI-inspected and rated</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-lift">
                <CardHeader>
                  <CardTitle>Recent Successful Matches</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { material: "Oak Lumber", time: "2 hours ago", distance: "3.2 km" },
                    { material: "Steel Beams", time: "5 hours ago", distance: "5.8 km" },
                    { material: "Ceramic Tiles", time: "1 day ago", distance: "1.5 km" },
                  ].map((match, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-semibold">{match.material}</p>
                        <p className="text-sm text-muted-foreground">{match.time}</p>
                      </div>
                      <div className="text-sm text-accent font-medium">{match.distance}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Request;
