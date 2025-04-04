export type Schema = {
  downloads: {
    id?: number;
    streamUrl: string;
    streamTitle?: string | null;
    downloadDate: string;
    fileSize?: number | null;
    filePath?: string | null;
    status: string;
    thumbnail?: string | null;
    quality?: string | null;
    duration?: number | null;
  };
  settings: {
    id?: number;
    downloadPath: string;
    defaultQuality: string;
    concurrentDownloads: number;
    notifyOnComplete: boolean;
  };
  photos: {
    id?: number;
    title: string;
    description?: string | null;
    imageUrl: string;
    category: string;
    featured?: boolean;
    date: string;
  };
  categories: {
    id?: number;
    name: string;
  };
};