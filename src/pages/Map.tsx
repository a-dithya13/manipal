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
  const [routeData, setRouteData] = useState<any>(null); // State to hold route data

  useEffect(() => {
    // Retrieve route data from localStorage when the component mounts or token is set
    const routeDataString = localStorage.getItem('routeData');
    if (routeDataString) {
      try {
        const data = JSON.parse(routeDataString);
        setRouteData(data);
        // Optionally remove from localStorage after reading if it's a one-time display
        // localStorage.removeItem('routeData'); 
      } catch (error) {
        console.error("Error parsing route data from localStorage:", error);
      }
    }
  }, []);

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

    // Sample markers for materials (can be replaced with fetched data or route data)
    const sampleMaterials = [
      { coords: [-0.118092, 51.509865], title: "Reclaimed Oak Planks", category: "Lumber" },
      { coords: [-0.128092, 51.519865], title: "Steel I-Beams", category: "Metal" },
      { coords: [-0.108092, 51.499865], title: "Light Fixtures", category: "Fixtures" },
    ];

    // Add sample markers if no route data is present
    if (!routeData) {
      sampleMaterials.forEach((material) => {
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<div class="p-2">
            <h3 class="font-semibold">${material.title}</h3>
            <p class="text-sm text-gray-600">${material.category}</p>
          </div>`
        );

        new mapboxgl.Marker({ color: "#1F8A7F" }) // Use a distinct color
          .setLngLat(material.coords as [number, number])
          .setPopup(popup)
          .addTo(map.current!);
      });
    }

    // If route data is available, draw the route and markers
    if (routeData && map.current) {
      const { origin, destination, materialTitle } = routeData;

      // Add destination marker
      const destinationPopup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<div class="p-2">
          <h3 class="font-semibold">${materialTitle}</h3>
          <p class="text-sm text-gray-600">Destination</p>
        </div>`
      );
      new mapboxgl.Marker({ color: "#E63946" }) // Red for destination
        .setLngLat([destination.lng, destination.lat])
        .setPopup(destinationPopup)
        .addTo(map.current!);

      // Add origin marker (buyer's location)
      const originPopup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<div class="p-2">
          <h3 class="font-semibold">Your Location</h3>
          <p class="text-sm text-gray-600">Origin</p>
        </div>`
      );
      new mapboxgl.Marker({ color: "#F4A261" }) // Orange for origin
        .setLngLat([origin.lng, origin.lat])
        .setPopup(originPopup)
        .addTo(map.current!);

      // Draw the route line
      map.current.addSource('route', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'LineString',
            'coordinates': [
              [origin.lng, origin.lat],
              [destination.lng, destination.lat]
            ]
          }
        }
      });

      map.current.addLayer({
        'id': 'route-line',
        'type': 'line',
        'source': 'route',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-color': '#3887be',
          'line-width': 5
        }
      });

      // Fit map to bounds of the route
      const bounds = new mapboxgl.LngLatBounds(
        [Math.min(origin.lng, destination.lng), Math.min(origin.lat, destination.lat)],
        [Math.max(origin.lng, destination.lng), Math.max(origin.lat, destination.lat)]
      );
      map.current.fitBounds(bounds, { padding: 50 });

      // Clear localStorage after use to prevent re-drawing on every interaction
      localStorage.removeItem('routeData');
    }

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, routeData]); // Re-run effect if token or routeData changes

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
