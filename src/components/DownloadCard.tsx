import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Schema } from "@/lib/db-types";
import { 
  Play, 
  Pause, 
  Trash2, 
  ExternalLink, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Folder 
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface DownloadCardProps {
  download: Schema["downloads"];
  onPause?: () => void;
  onResume?: () => void;
  onCancel?: () => void;
  onOpen?: () => void;
  progress?: number;
}

export function DownloadCard({ 
  download, 
  onPause, 
  onResume, 
  onCancel, 
  onOpen,
  progress = 0 
}: DownloadCardProps) {
  const [timeAgo, setTimeAgo] = useState("");
  
  useEffect(() => {
    setTimeAgo(formatDistanceToNow(new Date(download.downloadDate), { addSuffix: true }));
    
    const interval = setInterval(() => {
      setTimeAgo(formatDistanceToNow(new Date(download.downloadDate), { addSuffix: true }));
    }, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [download.downloadDate]);

  const formatFileSize = (bytes?: number | null) => {
    if (!bytes) return "Unknown size";
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(2)} ${units[unitIndex]}`;
  };

  const formatDuration = (seconds?: number | null) => {
    if (!seconds) return "Unknown duration";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    return [
      hours > 0 ? `${hours}h` : null,
      minutes > 0 ? `${minutes}m` : null,
      `${remainingSeconds}s`
    ].filter(Boolean).join(' ');
  };

  const renderStatusIcon = () => {
    switch (download.status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      case 'paused':
        return <Pause className="h-5 w-5 text-amber-500" />;
      case 'downloading':
        return <Play className="h-5 w-5 text-blue-500" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          {download.thumbnail ? (
            <div className="w-24 h-16 rounded overflow-hidden flex-shrink-0">
              <img 
                src={download.thumbnail} 
                alt={download.streamTitle || "Stream thumbnail"} 
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-24 h-16 bg-muted rounded flex items-center justify-center flex-shrink-0">
              <Play className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
          
          <div className="flex-grow min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {renderStatusIcon()}
              <h3 className="font-medium truncate">
                {download.streamTitle || "Untitled Stream"}
              </h3>
            </div>
            
            <p className="text-sm text-muted-foreground truncate mb-2">
              {download.streamUrl}
            </p>
            
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span>{timeAgo}</span>
              {download.fileSize && <span>{formatFileSize(download.fileSize)}</span>}
              {download.duration && <span>{formatDuration(download.duration)}</span>}
              {download.quality && <span>Quality: {download.quality}</span>}
            </div>
            
            {download.status === 'downloading' && (
              <div className="mt-3">
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-right mt-1">{progress}%</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-end gap-2 pt-0">
        {download.status === 'downloading' && (
          <>
            <Button variant="outline" size="sm" onClick={onPause}>
              <Pause className="h-4 w-4 mr-1" /> Pause
            </Button>
            <Button variant="destructive" size="sm" onClick={onCancel}>
              <Trash2 className="h-4 w-4 mr-1" /> Cancel
            </Button>
          </>
        )}
        
        {download.status === 'paused' && (
          <>
            <Button variant="outline" size="sm" onClick={onResume}>
              <Play className="h-4 w-4 mr-1" /> Resume
            </Button>
            <Button variant="destructive" size="sm" onClick={onCancel}>
              <Trash2 className="h-4 w-4 mr-1" /> Cancel
            </Button>
          </>
        )}
        
        {download.status === 'completed' && (
          <>
            <Button variant="outline" size="sm" onClick={onOpen}>
              <Folder className="h-4 w-4 mr-1" /> Open Location
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href={download.filePath || '#'} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-1" /> Open File
              </a>
            </Button>
          </>
        )}
        
        {download.status === 'failed' && (
          <Button variant="outline" size="sm" onClick={onResume}>
            <Play className="h-4 w-4 mr-1" /> Retry
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}