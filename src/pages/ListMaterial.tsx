import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Camera, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ListMaterial = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast({
      title: "Material Listed Successfully!",
      description: "Your material is now live on the marketplace. We'll notify you of interested buyers.",
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-success" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Material Listed Successfully!</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Your material is now live on the marketplace. We're analyzing the images 
              and will notify you of interested buyers within 24 hours.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => setIsSubmitted(false)} variant="outline">
                List Another
              </Button>
              <Button className="bg-cta text-cta-foreground hover:bg-cta/90">
                View My Listings
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">List Your Material</h1>
            <p className="text-xl text-muted-foreground">
              Share surplus materials and help reduce construction waste
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Images Upload */}
            <div className="bg-card rounded-2xl p-6 border border-border">
              <Label className="text-lg font-semibold mb-4 block">Material Photos</Label>
              <div className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-accent transition-colors cursor-pointer">
                <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">Upload Photos</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Add at least 3 photos showing different angles. Include a scale reference (ruler/common object).
                </p>
                <Button type="button" variant="outline">
                  <Upload className="mr-2 h-5 w-5" />
                  Choose Files
                </Button>
                <p className="text-xs text-muted-foreground mt-3">
                  AI will automatically assess quality and condition
                </p>
              </div>
            </div>

            {/* Basic Info */}
            <div className="bg-card rounded-2xl p-6 border border-border space-y-4">
              <Label className="text-lg font-semibold block">Basic Information</Label>
              
              <div>
                <Label htmlFor="title">Material Title *</Label>
                <Input 
                  id="title" 
                  placeholder="e.g., Reclaimed Oak Planks" 
                  required 
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select required>
                  <SelectTrigger id="category" className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lumber">Lumber</SelectItem>
                    <SelectItem value="metal">Metal</SelectItem>
                    <SelectItem value="fixtures">Fixtures</SelectItem>
                    <SelectItem value="concrete">Concrete</SelectItem>
                    <SelectItem value="plumbing">Plumbing</SelectItem>
                    <SelectItem value="electrical">Electrical</SelectItem>
                    <SelectItem value="glass">Glass</SelectItem>
                    <SelectItem value="tiles">Tiles</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input 
                    id="quantity" 
                    type="number" 
                    placeholder="e.g., 50" 
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="unit">Unit</Label>
                  <Select>
                    <SelectTrigger id="unit" className="mt-1">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pieces">Pieces</SelectItem>
                      <SelectItem value="kg">Kilograms</SelectItem>
                      <SelectItem value="m">Meters</SelectItem>
                      <SelectItem value="m2">Square Meters</SelectItem>
                      <SelectItem value="m3">Cubic Meters</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description"
                  placeholder="Describe the material condition, dimensions, and any special notes..."
                  rows={4}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Location */}
            <div className="bg-card rounded-2xl p-6 border border-border space-y-4">
              <Label className="text-lg font-semibold block">Location</Label>
              
              <div>
                <Label htmlFor="address">Pickup Address *</Label>
                <Input 
                  id="address" 
                  placeholder="Street address" 
                  required 
                  className="mt-1"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input id="city" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="postal">Postal Code *</Label>
                  <Input id="postal" required className="mt-1" />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-4">
              <Button 
                type="submit" 
                className="flex-1 bg-cta text-cta-foreground hover:bg-cta/90 py-6 text-lg"
              >
                List Material
              </Button>
              <Button type="button" variant="outline" className="py-6 px-8">
                Save Draft
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ListMaterial;
