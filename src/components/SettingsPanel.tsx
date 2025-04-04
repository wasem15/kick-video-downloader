import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Loader2, Save, FolderOpen } from "lucide-react";
import { fine } from "@/lib/fine";
import { Schema } from "@/lib/db-types";
import { useToast } from "@/hooks/use-toast";

export function SettingsPanel() {
  const [settings, setSettings] = useState<Schema["settings"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settingsData = await fine.table("settings").select();
        if (settingsData && settingsData.length > 0) {
          setSettings(settingsData[0]);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
        toast({
          title: "Error",
          description: "Failed to load settings",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, [toast]);

  const handleSaveSettings = async () => {
    if (!settings) return;
    
    setIsSaving(true);
    try {
      await fine.table("settings").update(settings).eq("id", settings.id).select();
      toast({
        title: "Success",
        description: "Settings saved successfully",
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (field: keyof Schema["settings"], value: any) => {
    if (!settings) return;
    setSettings({ ...settings, [field]: value });
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6 flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (!settings) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">Failed to load settings</p>
          <Button onClick={() => window.location.reload()} className="mx-auto mt-4 block">
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Download Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="downloadPath">Download Location</Label>
          <div className="flex space-x-2">
            <Input
              id="downloadPath"
              value={settings.downloadPath}
              onChange={(e) => handleChange("downloadPath", e.target.value)}
              placeholder="./downloads"
              className="flex-1"
            />
            <Button variant="outline" type="button">
              <FolderOpen className="h-4 w-4 mr-2" />
              Browse
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Directory where downloaded streams will be saved
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="defaultQuality">Default Quality</Label>
          <Select
            value={settings.defaultQuality}
            onValueChange={(value) => handleChange("defaultQuality", value)}
          >
            <SelectTrigger id="defaultQuality">
              <SelectValue placeholder="Select quality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="best">Best Available</SelectItem>
              <SelectItem value="1080p">1080p</SelectItem>
              <SelectItem value="720p">720p</SelectItem>
              <SelectItem value="480p">480p</SelectItem>
              <SelectItem value="360p">360p</SelectItem>
              <SelectItem value="worst">Lowest Quality</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Preferred video quality for downloads
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="concurrentDownloads">Concurrent Downloads</Label>
          <Select
            value={settings.concurrentDownloads.toString()}
            onValueChange={(value) => handleChange("concurrentDownloads", parseInt(value))}
          >
            <SelectTrigger id="concurrentDownloads">
              <SelectValue placeholder="Select number" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Maximum number of simultaneous downloads
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="notifyOnComplete">Notification on Completion</Label>
            <p className="text-xs text-muted-foreground">
              Show notification when download completes
            </p>
          </div>
          <Switch
            id="notifyOnComplete"
            checked={settings.notifyOnComplete}
            onCheckedChange={(checked) => handleChange("notifyOnComplete", checked)}
          />
        </div>

        <Button 
          onClick={handleSaveSettings} 
          className="w-full" 
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}