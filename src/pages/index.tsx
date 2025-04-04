import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { UrlInput } from "@/components/UrlInput";
import { StreamInfo } from "@/components/StreamInfo";
import { DownloadCard } from "@/components/DownloadCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { fine } from "@/lib/fine";
import { Schema } from "@/lib/db-types";

const Index = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [streamUrl, setStreamUrl] = useState("");
  const [streamInfo, setStreamInfo] = useState<any | null>(null);
  const [activeDownloads, setActiveDownloads] = useState<Schema["downloads"][]>([]);
  const [activeTab, setActiveTab] = useState("url");
  const { toast } = useToast();

  const handleUrlSubmit = async (url: string) => {
    setIsProcessing(true);
    setStreamUrl(url);
    
    try {
      // In a real app, this would make an API call to fetch stream info
      // For demo purposes, we'll simulate a delay and return mock data
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock stream info
      setStreamInfo({
        title: "Weekend Gaming Stream",
        username: url.split('/').pop() || "username",
        thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
        duration: 7200, // 2 hours
        date: new Date().toISOString(),
        isLive: Math.random() > 0.5,
        qualities: ["1080p60", "1080p", "720p60", "720p", "480p", "360p", "160p"]
      });
      
      setActiveTab("info");
    } catch (error) {
      console.error("Error fetching stream info:", error);
      toast({
        title: "Error",
        description: "Failed to fetch stream information",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = async (quality: string) => {
    setIsProcessing(true);
    
    try {
      // In a real app, this would start the actual download process
      // For demo purposes, we'll add it to the database
      const newDownload: Schema["downloads"] = {
        streamUrl,
        streamTitle: streamInfo.title,
        downloadDate: new Date().toISOString(),
        status: "downloading",
        thumbnail: streamInfo.thumbnail,
        quality,
        duration: streamInfo.duration
      };
      
      const result = await fine.table("downloads").insert(newDownload).select();
      
      if (result && result.length > 0) {
        setActiveDownloads([...activeDownloads, result[0]]);
        setActiveTab("downloads");
        
        toast({
          title: "Download Started",
          description: `"${streamInfo.title}" is now downloading`,
        });
      }
    } catch (error) {
      console.error("Error starting download:", error);
      toast({
        title: "Error",
        description: "Failed to start download",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePause = async (download: Schema["downloads"]) => {
    try {
      await fine.table("downloads").update({ status: "paused" }).eq("id", download.id).select();
      setActiveDownloads(
        activeDownloads.map(d => 
          d.id === download.id ? { ...d, status: "paused" } : d
        )
      );
      toast({
        title: "Download Paused",
        description: `"${download.streamTitle}" has been paused`,
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
      setActiveDownloads(
        activeDownloads.map(d => 
          d.id === download.id ? { ...d, status: "downloading" } : d
        )
      );
      toast({
        title: "Download Resumed",
        description: `"${download.streamTitle}" has been resumed`,
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
      setActiveDownloads(activeDownloads.filter(d => d.id !== download.id));
      toast({
        title: "Download Cancelled",
        description: `"${download.streamTitle}" has been cancelled`,
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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Kick Stream Downloader</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="url">Enter URL</TabsTrigger>
            <TabsTrigger value="info" disabled={!streamInfo}>Stream Info</TabsTrigger>
            <TabsTrigger value="downloads" disabled={activeDownloads.length === 0}>
              Active Downloads
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="url" className="mt-6">
            <div className="max-w-2xl mx-auto">
              <UrlInput onSubmit={handleUrlSubmit} isProcessing={isProcessing} />
              
              <div className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>How to use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">1. Find a Kick stream</h3>
                      <p className="text-sm text-muted-foreground">
                        Navigate to the Kick stream you want to download. Copy the URL from your browser's address bar.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">2. Paste the URL</h3>
                      <p className="text-sm text-muted-foreground">
                        Paste the URL in the input field above and click "Download Stream".
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">3. Select quality and download</h3>
                      <p className="text-sm text-muted-foreground">
                        Choose your preferred video quality and start the download.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="info" className="mt-6">
            {streamInfo && (
              <div className="max-w-3xl mx-auto">
                <StreamInfo 
                  streamUrl={streamUrl}
                  streamInfo={streamInfo}
                  onDownload={handleDownload}
                  isProcessing={isProcessing}
                />
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="downloads" className="mt-6">
            <div className="space-y-4">
              {activeDownloads.map((download, index) => (
                <DownloadCard
                  key={download.id || index}
                  download={download}
                  onPause={() => handlePause(download)}
                  onResume={() => handleResume(download)}
                  onCancel={() => handleCancel(download)}
                  progress={Math.floor(Math.random() * 100)} // Mock progress
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;