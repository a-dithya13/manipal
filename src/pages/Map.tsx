import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Search } from "lucide-react";

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState("");

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [-0.118092, 51.509865], // London default
      zoom: 12,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Sample markers for materials
    const materials = [
      { coords: [-0.118092, 51.509865], title: "Reclaimed Oak Planks", category: "Lumber" },
      { coords: [-0.128092, 51.519865], title: "Steel I-Beams", category: "Metal" },
      { coords: [-0.108092, 51.499865], title: "Light Fixtures", category: "Fixtures" },
    ];

    materials.forEach((material) => {
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<div class="p-2">
          <h3 class="font-semibold">${material.title}</h3>
          <p class="text-sm text-gray-600">${material.category}</p>
        </div>`
      );

      new mapboxgl.Marker({ color: "#1F8A5F" })
        .setLngLat(material.coords as [number, number])
        .setPopup(popup)
        .addTo(map.current!);
    });

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col">
        {/* Search Bar */}
        <div className="container py-4">
          <div className="bg-card rounded-2xl p-4 border border-border shadow-sm">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Enter location or postal code..." 
                  className="pl-10"
                />
              </div>
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Search className="mr-2 h-5 w-5" />
                Search Area
              </Button>
            </div>
          </div>
        </div>

        {/* Map or Token Input */}
        {!mapboxToken ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="max-w-md w-full bg-card rounded-2xl p-8 border border-border text-center">
              <MapPin className="h-12 w-12 text-accent mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Enable Map View</h2>
              <p className="text-muted-foreground mb-6">
                To view nearby materials on a map, please enter your Mapbox public token.
                Get one free at{" "}
                <a 
                  href="https://mapbox.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  mapbox.com
                </a>
              </p>
              <Input 
                type="text"
                placeholder="pk.eyJ1Ijoi..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="mb-4"
              />
              <Button 
                onClick={() => {
                  if (mapboxToken.startsWith('pk.')) {
                    // Token is valid format
                  }
                }}
                className="w-full bg-cta text-cta-foreground hover:bg-cta/90"
              >
                Enable Map
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex-1 relative">
            <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;
