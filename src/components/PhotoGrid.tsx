import { PhotoCard } from "./PhotoCard";
import { Schema } from "@/lib/db-types";

interface PhotoGridProps {
  photos: Schema["photos"][];
  className?: string;
}

export function PhotoGrid({ photos, className }: PhotoGridProps) {
  if (!photos || photos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No photos found.</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}>
      {photos.map((photo) => (
        <PhotoCard
          key={photo.id}
          id={photo.id!}
          title={photo.title}
          imageUrl={photo.imageUrl}
          category={photo.category}
          featured={photo.featured}
        />
      ))}
    </div>
  );
}