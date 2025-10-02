import Navbar from "@/components/Navbar";
import MaterialCard from "@/components/MaterialCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";

const Marketplace = () => {
  const materials = [
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
    {
      id: "4",
      title: "Concrete Blocks",
      category: "Concrete",
      images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400"],
      qualityScore: 0.85,
      distanceKm: 4.5,
      carbonSavedKg: 65,
      condition: "good" as const,
      verified: true,
    },
    {
      id: "5",
      title: "Copper Piping",
      category: "Plumbing",
      images: ["https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400"],
      qualityScore: 0.95,
      distanceKm: 1.8,
      carbonSavedKg: 32,
      condition: "excellent" as const,
      verified: true,
    },
    {
      id: "6",
      title: "Window Frames",
      category: "Glass",
      images: ["https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400"],
      qualityScore: 0.72,
      distanceKm: 6.2,
      carbonSavedKg: 28,
      condition: "repairable" as const,
      verified: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Marketplace</h1>
          <p className="text-xl text-muted-foreground">
            Browse {materials.length} available construction materials
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-2xl p-6 mb-8 border border-border shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search by material name or type..." 
                className="pl-10"
              />
            </div>
            
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="lumber">Lumber</SelectItem>
                <SelectItem value="metal">Metal</SelectItem>
                <SelectItem value="fixtures">Fixtures</SelectItem>
                <SelectItem value="concrete">Concrete</SelectItem>
                <SelectItem value="plumbing">Plumbing</SelectItem>
                <SelectItem value="glass">Glass</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="distance">
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="distance">Nearest First</SelectItem>
                <SelectItem value="quality">Highest Quality</SelectItem>
                <SelectItem value="carbon">Most CO₂ Saved</SelectItem>
                <SelectItem value="recent">Recently Listed</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Materials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((material) => (
            <MaterialCard key={material.id} {...material} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
