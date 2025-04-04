import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Link as LinkIcon } from "lucide-react";

interface UrlInputProps {
  onSubmit: (url: string) => void;
  isProcessing: boolean;
}

export function UrlInput({ onSubmit, isProcessing }: UrlInputProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }
    
    // Very basic URL validation
    if (!url.startsWith("https://kick.com/") && !url.startsWith("https://www.kick.com/")) {
      setError("Please enter a valid Kick URL");
      return;
    }
    
    setError(null);
    onSubmit(url.trim());
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <LinkIcon className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                type="url"
                placeholder="https://kick.com/username"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (error) setError(null);
                }}
                className="pl-10"
                disabled={isProcessing}
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <Download className="mr-2 h-5 w-5" />
                Download Stream
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}