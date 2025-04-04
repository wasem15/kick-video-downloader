import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PhotoCardProps {
  id: number;
  title: string;
  imageUrl: string;
  category: string;
  featured?: boolean;
  className?: string;
}

export function PhotoCard({ id, title, imageUrl, category, featured, className }: PhotoCardProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Link to={`/photo/${id}`}>
      <Card className={cn("overflow-hidden group cursor-pointer h-full", className)}>
        <CardContent className="p-0 relative h-full">
          <div className="relative aspect-square overflow-hidden">
            {isLoading && (
              <div className="absolute inset-0 bg-muted animate-pulse" />
            )}
            <img
              src={imageUrl}
              alt={title}
              className={cn(
                "object-cover w-full h-full transition-all duration-300 group-hover:scale-105",
                isLoading ? "opacity-0" : "opacity-100"
              )}
              onLoad={() => setIsLoading(false)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="font-medium text-lg">{title}</h3>
              <p className="text-sm text-white/80">{category}</p>
            </div>
            {featured && (
              <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-md">
                Featured
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}