import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { PhotoGrid } from "@/components/PhotoGrid";
import { fine } from "@/lib/fine";
import { Schema } from "@/lib/db-types";
import { ArrowLeft, Calendar, Tag, Download, Share2, Loader2 } from "lucide-react";

const PhotoDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<Schema["photos"] | null>(null);
  const [relatedPhotos, setRelatedPhotos] = useState<Schema["photos"][]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPhoto = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const photoData = await fine.table("photos").select().eq("id", parseInt(id));
        
        if (photoData && photoData.length > 0) {
          setPhoto(photoData[0]);
          
          // Fetch related photos with the same category
          const related = await fine.table("photos")
            .select()
            .eq("category", photoData[0].category)
            .neq("id", parseInt(id))
            .limit(4);
          
          setRelatedPhotos(related || []);
        } else {
          navigate("/gallery", { replace: true });
        }
      } catch (error) {
        console.error("Error fetching photo:", error);
        navigate("/gallery", { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhoto();
  }, [id, navigate]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!photo) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Photo Not Found</h1>
          <p className="text-muted-foreground mb-8">The photo you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/gallery">Back to Gallery</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <Button asChild variant="ghost" className="mb-6">
            <Link to="/gallery" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Gallery
            </Link>
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="rounded-lg overflow-hidden">
                <img 
                  src={photo.imageUrl} 
                  alt={photo.title} 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            
            <div>
              <h1 className="text-3xl font-bold mb-4">{photo.title}</h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{photo.date}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Tag className="mr-2 h-4 w-4" />
                  <span>{photo.category}</span>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-8">
                {photo.description || "No description available for this photo."}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Button className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button variant="outline" className="flex items-center">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
              
              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold mb-4">Photo Details</h2>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Category</dt>
                    <dd>{photo.category}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Date Taken</dt>
                    <dd>{photo.date}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Featured</dt>
                    <dd>{photo.featured ? "Yes" : "No"}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Photos Section */}
        {relatedPhotos.length > 0 && (
          <section className="py-16 bg-muted/50">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8">Related Photos</h2>
              <PhotoGrid photos={relatedPhotos} />
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default PhotoDetail;