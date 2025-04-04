CREATE TABLE downloads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  streamUrl TEXT NOT NULL,
  streamTitle TEXT,
  downloadDate TEXT NOT NULL,
  fileSize INTEGER,
  filePath TEXT,
  status TEXT NOT NULL,
  thumbnail TEXT,
  quality TEXT,
  duration INTEGER
);

CREATE TABLE settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  downloadPath TEXT NOT NULL DEFAULT './downloads',
  defaultQuality TEXT NOT NULL DEFAULT 'best',
  concurrentDownloads INTEGER NOT NULL DEFAULT 2,
  notifyOnComplete BOOLEAN NOT NULL DEFAULT TRUE
);

-- Insert default settings
INSERT INTO settings (downloadPath, defaultQuality, concurrentDownloads, notifyOnComplete) 
VALUES ('./downloads', 'best', 2, TRUE);