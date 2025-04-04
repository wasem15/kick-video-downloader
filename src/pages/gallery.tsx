import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PhotoGrid } from "@/components/PhotoGrid";
import { fine } from "@/lib/fine";
import { Schema } from "@/lib/db-types";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

const Gallery = () => {
  const [photos, setPhotos] = useState<Schema["photos"][]>([]);
  const [categories, setCategories] = useState<Schema["categories"][]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await fine.table("categories").select();
        setCategories(categoriesData || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPhotos = async () => {
      setIsLoading(true);
      try {
        let query = fine.table("photos").select();
        
        if (activeCategory !== "all") {
          query = query.eq("category", activeCategory);
        }
        
        const photosData = await query;
        setPhotos(photosData || []);
      } catch (error) {
        console.error("Error fetching photos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, [activeCategory]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Photo Gallery</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse through my collection of photographs capturing moments of beauty, emotion, and storytelling.
          </p>
        </div>

        <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveCategory}>
          <div className="flex justify-center mb-6">
            <TabsList className="grid grid-flow-col auto-cols-max gap-2">
              <TabsTrigger value="all">All</TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.name}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="all">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <PhotoGrid photos={photos} />
            )}
          </TabsContent>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.name}>
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <PhotoGrid photos={photos} />
              )}
            </TabsContent>
          ))}
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Gallery;