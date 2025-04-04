import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./theme-toggle";
import { useIsMobile } from "@/hooks/use-mobile";

const navItems = [
  { name: "Downloader", path: "/" },
  { name: "History", path: "/history" },
  { name: "Settings", path: "/settings" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Download className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Kick Stream Downloader</span>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground transition-colors"
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
          )}

          <div className="flex items-center space-x-4">
            <ModeToggle />
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobile && isMenuOpen && (
          <nav className="mt-4 flex flex-col space-y-4 pb-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground transition-colors"
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}