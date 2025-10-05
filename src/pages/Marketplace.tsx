import Navbar from "@/components/Navbar";
import MaterialCard from "@/components/MaterialCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast"; // Import useToast

// Define the type for a material item
interface Material {
  id: string; // This is the frontend-generated ID, MongoDB will use _id
  title: string;
  category: string;
  images: string[]; // Expecting URLs
  qualityScore: number;
  distanceKm: number;
  carbonSavedKg: number;
  condition: "excellent" | "good" | "repairable";
  verified: boolean;
  description?: string; // Added description field
  latitude?: number; // Added for location
  longitude?: number; // Added for location
  unit?: string; // Added from ListMaterial.tsx
  pickupAddress?: string; // Added from ListMaterial.tsx
  city?: string; // Added from ListMaterial.tsx
  postalCode?: string; // Added from ListMaterial.tsx
}

// Define the type for a material request
interface Request {
  _id: string; // MongoDB's default _id
  materialType: string;
  quantity: string;
  location: string;
  deadline: string;
  description: string;
  createdAt: string;
}

// Initial materials data (will be managed by state)
const initialMaterials: Material[] = [
  {
    id: "1",
    title: "Reclaimed Oak Planks",
    category: "Lumber",
    images: ["https://images.unsplash.com/photo-1606744837616-56c9a5c6c00c?w=400"],
    qualityScore: 0.92,
    distanceKm: 3.2,
    carbonSavedKg: 45,
    condition: "excellent",
    verified: true,
    latitude: 51.509865, // London coordinates
    longitude: -0.118092,
    unit: "pieces",
    pickupAddress: "123 Oak St",
    city: "London",
    postalCode: "SW1A 0AA",
  },
  {
    id: "2",
    title: "Steel I-Beams",
    category: "Metal",
    images: ["https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=400"],
    qualityScore: 0.88,
    distanceKm: 5.8,
    carbonSavedKg: 120,
    condition: "good",
    verified: true,
    latitude: 51.519865, // Slightly different London coordinates
    longitude: -0.128092,
    unit: "kg",
    pickupAddress: "456 Steel Ave",
    city: "London",
    postalCode: "SW1A 1AA",
  },
  {
    id: "3",
    title: "Industrial Light Fixtures",
    category: "Fixtures",
    images: ["https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400"],
    qualityScore: 0.76,
    distanceKm: 2.1,
    carbonSavedKg: 18,
    condition: "repairable",
    verified: false,
    latitude: 51.499865, // Another London coordinate
    longitude: -0.108092,
    unit: "pieces",
    pickupAddress: "789 Light Blvd",
    city: "London",
    postalCode: "SW1A 2AA",
  },
  {
    id: "4",
    title: "Concrete Blocks",
    category: "Concrete",
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400"],
    qualityScore: 0.85,
    distanceKm: 4.5,
    carbonSavedKg: 65,
    condition: "good",
    verified: true,
    latitude: 51.505000,
    longitude: -0.130000,
    unit: "m3",
    pickupAddress: "101 Concrete Rd",
    city: "London",
    postalCode: "SW1A 3AA",
  },
  {
    id: "5",
    title: "Copper Piping",
    category: "Plumbing",
    images: ["https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400"],
    qualityScore: 0.95,
    distanceKm: 1.8,
    carbonSavedKg: 32,
    condition: "excellent",
    verified: true,
    latitude: 51.510000,
    longitude: -0.100000,
    unit: "m",
    pickupAddress: "202 Copper Ln",
    city: "London",
    postalCode: "SW1A 4AA",
  },
  {
    id: "6",
    title: "Window Frames",
    category: "Glass",
    images: ["https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400"],
    qualityScore: 0.72,
    distanceKm: 6.2,
    carbonSavedKg: 28,
    condition: "repairable",
    verified: false,
    latitude: 51.525000,
    longitude: -0.140000,
    unit: "pieces",
    pickupAddress: "303 Window Way",
    city: "London",
    postalCode: "SW1A 5AA",
  },
];

const Marketplace = () => {
  const [materials, setMaterials] = useState<Material[]>(initialMaterials);
  const [requests, setRequests] = useState<Request[]>([]); // State to hold fetched requests
  const [buyerLocation, setBuyerLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const { toast } = useToast(); // Initialize useToast hook

  // State for the new material form
  const [newMaterialTitle, setNewMaterialTitle] = useState("");
  const [newMaterialCategory, setNewMaterialCategory] = useState("");
  const [newMaterialQuantity, setNewMaterialQuantity] = useState("");
  const [newMaterialUnit, setNewMaterialUnit] = useState(""); // New state for unit
  const [newMaterialDistance, setNewMaterialDistance] = useState(""); // Use string for input, parse later
  const [newMaterialDescription, setNewMaterialDescription] = useState("");
  const [newMaterialImages, setNewMaterialImages] = useState<File[]>([]);
  const [newMaterialPickupAddress, setNewMaterialPickupAddress] = useState(""); // New state for pickup address
  const [newMaterialCity, setNewMaterialCity] = useState(""); // New state for city
  const [newMaterialPostalCode, setNewMaterialPostalCode] = useState(""); // New state for postal code

  // Fetch requests from backend
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/requests');
        if (!response.ok) throw new Error('Failed to fetch requests');
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };
    fetchRequests();
  }, []);

  // Fetch buyer location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setBuyerLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting buyer location:", error);
          alert("Could not get your current location. Please enable location services or enter it manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser. Please enter your location manually in the form.");
    }
  }, []); // Empty dependency array means this runs once on mount

  // Handler for image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewMaterialImages(Array.from(e.target.files));
    }
  };

  // Handler for adding a new material
  const handleAddMaterial = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!newMaterialTitle || !newMaterialCategory || !newMaterialQuantity || !newMaterialDistance || newMaterialImages.length === 0 || !newMaterialPickupAddress || !newMaterialCity || !newMaterialPostalCode) {
      alert("Please fill in all required fields and add at least one image.");
      return;
    }

    const distance = parseFloat(newMaterialDistance);
    if (isNaN(distance)) {
      alert("Distance must be a number.");
      return;
    }

    // Placeholder image URLs. In a real app, these files would be uploaded.
    const imageUrls = newMaterialImages.map((file, index) => `https://via.placeholder.com/150/0000FF/FFFFFF?text=Image+${index + 1}`);

    const newMaterial: Material = {
      id: Date.now().toString(), // Simple unique ID
      title: `${newMaterialQuantity} ${newMaterialUnit || ''} of ${newMaterialTitle}`, // Combine quantity, unit, and title
      category: newMaterialCategory,
      images: imageUrls,
      qualityScore: 0.8, // Default quality score
      distanceKm: distance,
      carbonSavedKg: 50, // Default carbon saved
      condition: "good", // Default condition
      verified: false, // Default verified status
      description: newMaterialDescription, // Add description
      pickupAddress: newMaterialPickupAddress,
      city: newMaterialCity,
      postalCode: newMaterialPostalCode,
      // For new materials added via form, we don't have lat/lon yet.
      // These would need to be determined or provided.
      // For now, leaving them undefined.
    };

    setMaterials([newMaterial, ...materials]); // Add new material to the beginning of the list

    // Clear the form
    setNewMaterialTitle("");
    setNewMaterialCategory("");
    setNewMaterialQuantity("");
    setNewMaterialUnit("");
    setNewMaterialDistance("");
    setNewMaterialDescription("");
    setNewMaterialImages([]);
    setNewMaterialPickupAddress("");
    setNewMaterialCity("");
    setNewMaterialPostalCode("");
    
    // Reset the file input element by resetting the form
    (e.target as HTMLFormElement).reset();
  };

  // Handler for requesting a material (creates a booking)
  const handleRequestMaterial = async (material: Material) => {
    // Ensure buyer location is available
    if (!buyerLocation) {
      alert("Your location is needed to place a request. Please ensure location services are enabled or enter it manually.");
      // Optionally, prompt user to enter location manually if geolocation fails or is not supported
      // For now, we'll just alert and return.
      return;
    }

    // Proceed with booking if buyerLocation is available and material has seller location
    if (material.latitude !== undefined && material.longitude !== undefined) {
      try {
        const bookingData = {
          materialId: material.id, // Use the frontend ID for now, backend might map it to MongoDB _id
          buyerLocation: buyerLocation,
          sellerLocation: { lat: material.latitude, lng: material.longitude },
          materialTitle: material.title,
          status: 'pending', // Initial status
        };

        const response = await fetch('http://localhost:3001/api/bookings', { // Assuming backend runs on port 3001
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookingData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const savedBooking = await response.json();
        console.log('Booking created successfully:', savedBooking);

        // Show success toast
        toast({
          title: "Request Placed! 🚀",
          description: `Your request for ${material.title} has been sent.`,
        });

        // Navigate to the map page after successful booking
        window.location.href = '/map'; // Navigate to the map page

      } catch (error) {
        console.error('Error creating booking:', error);
        toast({
          title: "Booking Failed",
          description: "There was an error placing your request. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      alert("Cannot initiate request: Seller location is missing for this material.");
    }
  };

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

        {/* Add New Material Form */}
        <Card className="card-lift mb-8">
          <CardHeader>
            <CardTitle>Add New Material Listing</CardTitle>
            <CardDescription>
              Fill in the details to list a new material on the marketplace.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddMaterial} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-material-title">Material Name</Label>
                  <Input 
                    id="new-material-title"
                    placeholder="e.g., Oak Planks"
                    value={newMaterialTitle}
                    onChange={(e) => setNewMaterialTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-material-quantity">Quantity</Label>
                  <Input 
                    id="new-material-quantity"
                    placeholder="e.g., 50"
                    value={newMaterialQuantity}
                    onChange={(e) => setNewMaterialQuantity(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-material-category">Category</Label>
                  <Select 
                    value={newMaterialCategory} 
                    onValueChange={setNewMaterialCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
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
                  <Label htmlFor="new-material-unit">Unit</Label>
                  <Select 
                    value={newMaterialUnit} 
                    onValueChange={setNewMaterialUnit}
                  >
                    <SelectTrigger id="new-material-unit">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-material-distance">Distance (km)</Label>
                  <Input 
                    id="new-material-distance"
                    type="number"
                    placeholder="e.g., 5.5"
                    value={newMaterialDistance}
                    onChange={(e) => setNewMaterialDistance(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-material-pickup-address">Pickup Address</Label>
                  <Input 
                    id="new-material-pickup-address"
                    placeholder="Street address"
                    value={newMaterialPickupAddress}
                    onChange={(e) => setNewMaterialPickupAddress(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-material-city">City</Label>
                  <Input 
                    id="new-material-city"
                    placeholder="City"
                    value={newMaterialCity}
                    onChange={(e) => setNewMaterialCity(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-material-postal-code">Postal Code</Label>
                  <Input 
                    id="new-material-postal-code"
                    placeholder="Postal Code"
                    value={newMaterialPostalCode}
                    onChange={(e) => setNewMaterialPostalCode(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-material-description">Description</Label>
                <Textarea 
                  id="new-material-description"
                  placeholder="Describe the material, its condition, and any specific details..."
                  className="min-h-[100px]"
                  value={newMaterialDescription}
                  onChange={(e) => setNewMaterialDescription(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-material-images">Upload Images</Label>
                <Input 
                  id="new-material-images"
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className="file:bg-primary file:text-primary-foreground file:border-0 file:rounded-md file:px-4 file:py-2 file:cursor-pointer"
                />
                {newMaterialImages.length > 0 && (
                  <p className="text-sm text-muted-foreground">{newMaterialImages.length} file(s) selected</p>
                )}
              </div>

              <Button type="submit" className="w-full bg-cta text-cta-foreground hover:bg-cta/90">
                Add Material to Marketplace
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Materials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((material) => (
            <MaterialCard 
              key={material.id} 
              {...material} 
              onRequestClick={() => handleRequestMaterial(material)} 
            />
          ))}
        </div>

        {/* Display Fetched Requests */}
        {requests.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6">Pending Material Requests</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {requests.map((request) => (
                <Card key={request._id} className="bg-card rounded-2xl shadow-md overflow-hidden card-lift border border-border p-6">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-lg">{request.materialType}</CardTitle>
                    <CardDescription>{request.quantity}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 space-y-2">
                    <p className="text-sm text-muted-foreground">Location: {request.location || 'N/A'}</p>
                    <p className="text-sm text-muted-foreground">Needed By: {request.deadline ? new Date(request.deadline).toLocaleDateString() : 'N/A'}</p>
                    {request.description && <p className="text-sm text-muted-foreground">{request.description}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;

