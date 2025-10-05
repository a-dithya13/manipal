import { MapPin, Leaf, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MaterialCardProps {
  id: string;
  title: string;
  category: string;
  images: string[];
  qualityScore: number;
  distanceKm: number;
  carbonSavedKg: number;
  condition: "good" | "repairable" | "excellent";
  verified?: boolean;
  description?: string; // Added description
  onRequestClick?: () => void; // Added request handler
}

const MaterialCard = ({
  title,
  category,
  images,
  qualityScore,
  distanceKm,
  carbonSavedKg,
  condition,
  verified = false,
  description, // Added description
  onRequestClick, // Added request handler
}: MaterialCardProps) => {
  const getConditionColor = (cond: string) => {
    switch (cond) {
      case "excellent": return "bg-success text-success-foreground";
      case "good": return "bg-teal text-teal-foreground";
      case "repairable": return "bg-cta text-cta-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const qualityPercentage = Math.round(qualityScore * 100);

  return (
    <article className="bg-card rounded-2xl shadow-md overflow-hidden card-lift border border-border">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={images[0]} 
          alt={`${title} - ${category}`}
          className="w-full h-full object-cover"
        />
        {verified && (
          <div className="absolute top-3 right-3 sticker">
            <span className="text-xs font-bold text-accent">✓ Inspected</span>
          </div>
        )}
        <Badge 
          className={`absolute top-3 left-3 ${getConditionColor(condition)}`}
        >
          {condition}
        </Badge>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Package className="h-3 w-3" />
              {category}
            </p>
          </div>
        </div>

        {/* Quality Meter */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-muted-foreground">AI Quality Score</span>
            <span className="text-sm font-bold">{qualityPercentage}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-accent to-success transition-all duration-500"
              style={{ width: `${qualityPercentage}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{distanceKm} km away</span>
          </div>
          <div className="flex items-center gap-1 text-success">
            <Leaf className="h-4 w-4" />
            <span className="font-semibold">{carbonSavedKg} kg CO₂</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button className="flex-1 bg-cta text-cta-foreground hover:bg-cta/90" onClick={onRequestClick}>
            Request Pickup
          </Button>
          <Button variant="outline" size="icon">
            ♡
          </Button>
        </div>
      </div>
    </article>
  );
};

export default MaterialCard;
