import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Clock, User, Calendar } from "lucide-react";

interface StreamInfoProps {
  streamUrl: string;
  streamInfo: {
    title: string;
    username: string;
    thumbnail: string;
    duration: number;
    date: string;
    isLive: boolean;
    qualities: string[];
  };
  onDownload: (quality: string) => void;
  isProcessing: boolean;
}

export function StreamInfo({ streamUrl, streamInfo, onDownload, isProcessing }: StreamInfoProps) {
  const [selectedQuality, setSelectedQuality] = useState(streamInfo.qualities[0] || "best");

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    return [
      hours > 0 ? `${hours}h` : null,
      minutes > 0 ? `${minutes}m` : null,
      `${remainingSeconds}s`
    ].filter(Boolean).join(' ');
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 aspect-video rounded-md overflow-hidden">
            <img 
              src={streamInfo.thumbnail} 
              alt={streamInfo.title} 
              className="w-full h-full object-cover"
            />
            {streamInfo.isLive && (
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                LIVE
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-2">{streamInfo.title}</h2>
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <User className="h-4 w-4 mr-2" />
                <span>{streamInfo.username}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-2" />
                <span>{formatDuration(streamInfo.duration)}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{new Date(streamInfo.date).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Stream URL</label>
                <p className="text-sm text-muted-foreground break-all">{streamUrl}</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Quality</label>
                <Select
                  value={selectedQuality}
                  onValueChange={setSelectedQuality}
                  disabled={isProcessing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select quality" />
                  </SelectTrigger>
                  <SelectContent>
                    {streamInfo.qualities.map((quality) => (
                      <SelectItem key={quality} value={quality}>
                        {quality}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={() => onDownload(selectedQuality)}
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
      </CardFooter>
    </Card>
  );
}