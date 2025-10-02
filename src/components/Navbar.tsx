import { Link, useLocation } from "react-router-dom";
import { Recycle, Menu, User, MapPin, Moon, Sun, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/ThemeProvider";
import { Separator } from "@/components/ui/separator";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  
  const mainLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/marketplace", label: "Marketplace" },
    { to: "/list-material", label: "List Material" },
    { to: "/request", label: "Request" },
  ];

  const secondaryLinks = [
    { to: "/map", label: "Map" },
    { to: "/sustainability", label: "Impact" },
    { to: "/leaderboard", label: "Leaderboard" },
    { to: "/rewards", label: "Rewards" },
    { to: "/about", label: "About" },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="rounded-full bg-accent p-2 transition-all group-hover:scale-110 group-hover:rotate-12">
              <Recycle className="h-5 w-5 text-accent-foreground" />
            </div>
            <span className="text-xl font-bold heading-hover hidden sm:inline">ReclaimNet</span>
          </Link>

          {/* Desktop Navigation - Main Links */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {mainLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActivePath(link.to)
                    ? 'bg-accent text-accent-foreground'
                    : 'text-foreground/70 hover:text-foreground hover:bg-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            <Separator orientation="vertical" className="h-6 mx-2" />
            
            {/* More Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="text-sm font-medium"
                >
                  More
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-popover z-50">
                {secondaryLinks.map((link) => (
                  <DropdownMenuItem key={link.to} asChild>
                    <Link 
                      to={link.to}
                      className={`cursor-pointer ${
                        isActivePath(link.to) ? 'bg-accent text-accent-foreground' : ''
                      }`}
                    >
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Theme Toggle */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="transition-all hover:scale-110 hover:rotate-12"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? 
                <Sun className="h-5 w-5" /> : 
                <Moon className="h-5 w-5" />
              }
            </Button>

            {/* Location - Hidden on small screens */}
            <Button 
              variant="ghost" 
              size="icon"
              className="hidden md:flex hover:scale-110 transition-transform"
              aria-label="Location"
            >
              <MapPin className="h-5 w-5" />
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="hidden md:flex hover:scale-110 transition-transform"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-popover z-50">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>My Listings</DropdownMenuItem>
                <DropdownMenuItem>My Requests</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* CTA Button */}
            <Button className="bg-cta text-cta-foreground hover:bg-cta/90 hidden sm:flex shadow-lg hover:shadow-xl transition-all">
              Get Started
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px] bg-background">
                <div className="flex flex-col gap-6 mt-8">
                  {/* Mobile Main Links */}
                  <div className="space-y-1">
                    {mainLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                          isActivePath(link.to)
                            ? 'bg-accent text-accent-foreground'
                            : 'text-foreground/80 hover:text-foreground hover:bg-muted'
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>

                  <Separator />

                  {/* Mobile Secondary Links */}
                  <div className="space-y-1">
                    {secondaryLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                          isActivePath(link.to)
                            ? 'bg-accent text-accent-foreground'
                            : 'text-foreground/70 hover:text-foreground hover:bg-muted'
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>

                  <Separator />

                  {/* Mobile Actions */}
                  <div className="space-y-3">
                    <Button className="w-full bg-cta text-cta-foreground hover:bg-cta/90 shadow-lg">
                      Get Started
                    </Button>
                    <Button variant="outline" className="w-full">
                      <User className="mr-2 h-4 w-4" />
                      Sign In
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
