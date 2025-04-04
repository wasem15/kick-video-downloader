import { useState, useEffect } from "react";
import { DownloadCard } from "./DownloadCard";
import { Schema } from "@/lib/db-types";
import { fine } from "@/lib/fine";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function DownloadHistory() {
  const [downloads, setDownloads] = useState<Schema["downloads"][]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchDownloads();
  }, []);

  const fetchDownloads = async () => {
    setIsLoading(true);
    try {
      const downloadsData = await fine.table("downloads").select().order("downloadDate", { ascending: false });
      setDownloads(downloadsData || []);
    } catch (error) {
      console.error("Error fetching downloads:", error);
      toast({
        title: "Error",
        description: "Failed to load download history",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePause = async (download: Schema["downloads"]) => {
    try {
      await fine.table("downloads").update({ status: "paused" }).eq("id", download.id).select();
      fetchDownloads();
      toast({
        title: "Download Paused",
        description: `"${download.streamTitle || 'Untitled Stream'}" has been paused`,
      });
    } catch (error) {
      console.error("Error pausing download:", error);
      toast({
        title: "Error",
        description: "Failed to pause download",
        variant: "destructive",
      });
    }
  };

  const handleResume = async (download: Schema["downloads"]) => {
    try {
      await fine.table("downloads").update({ status: "downloading" }).eq("id", download.id).select();
      fetchDownloads();
      toast({
        title: "Download Resumed",
        description: `"${download.streamTitle || 'Untitled Stream'}" has been resumed`,
      });
    } catch (error) {
      console.error("Error resuming download:", error);
      toast({
        title: "Error",
        description: "Failed to resume download",
        variant: "destructive",
      });
    }
  };

  const handleCancel = async (download: Schema["downloads"]) => {
    try {
      await fine.table("downloads").update({ status: "cancelled" }).eq("id", download.id).select();
      fetchDownloads();
      toast({
        title: "Download Cancelled",
        description: `"${download.streamTitle || 'Untitled Stream'}" has been cancelled`,
      });
    } catch (error) {
      console.error("Error cancelling download:", error);
      toast({
        title: "Error",
        description: "Failed to cancel download",
        variant: "destructive",
      });
    }
  };

  const handleOpenLocation = (download: Schema["downloads"]) => {
    // In a real app, this would use Electron's shell.openPath or similar
    toast({
      title: "Open Location",
      description: `Would open: ${download.filePath}`,
    });
  };

  const filteredDownloads = downloads.filter(download => {
    const matchesSearch = searchTerm === "" || 
      (download.streamTitle?.toLowerCase().includes(searchTerm.toLowerCase()) || 
       download.streamUrl.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === "all" || download.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search downloads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full"
              onClick={() => setSearchTerm("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Downloads</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="downloading">Downloading</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredDownloads.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-muted/20">
          <p className="text-muted-foreground">No downloads found</p>
          {(searchTerm || statusFilter !== "all") && (
            <Button 
              variant="link" 
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
              }}
            >
              Clear filters
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredDownloads.map((download) => (
            <DownloadCard
              key={download.id}
              download={download}
              onPause={() => handlePause(download)}
              onResume={() => handleResume(download)}
              onCancel={() => handleCancel(download)}
              onOpen={() => handleOpenLocation(download)}
              progress={download.status === 'downloading' ? 45 : 0} // Mock progress
            />
          ))}
        </div>
      )}
    </div>
  );
}