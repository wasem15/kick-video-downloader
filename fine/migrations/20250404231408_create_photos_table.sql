CREATE TABLE photos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  imageUrl TEXT NOT NULL,
  category TEXT NOT NULL,
  featured BOOLEAN DEFAULT FALSE,
  date TEXT NOT NULL
);

CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE
);

-- Insert some initial categories
INSERT INTO categories (name) VALUES ('Nature');
INSERT INTO categories (name) VALUES ('Portrait');
INSERT INTO categories (name) VALUES ('Architecture');
INSERT INTO categories (name) VALUES ('Street');
INSERT INTO categories (name) VALUES ('Travel');

-- Insert some sample photos
INSERT INTO photos (title, description, imageUrl, category, featured, date) VALUES 
('Mountain Sunrise', 'Beautiful sunrise over mountain peaks', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', 'Nature', TRUE, '2023-05-15'),
('Urban Geometry', 'Modern architecture with clean lines', 'https://images.unsplash.com/photo-1486718448742-163732cd1544', 'Architecture', TRUE, '2023-06-22'),
('Portrait in Shadow', 'Dramatic portrait with natural lighting', 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04', 'Portrait', TRUE, '2023-07-10'),
('City Streets', 'Busy intersection at dusk', 'https://images.unsplash.com/photo-1519501025264-65ba15a82390', 'Street', FALSE, '2023-08-05'),
('Ocean Waves', 'Powerful waves crashing on rocky shore', 'https://images.unsplash.com/photo-1518837695005-2083093ee35b', 'Nature', FALSE, '2023-09-12'),
('Desert Landscape', 'Minimalist desert scene at sunset', 'https://images.unsplash.com/photo-1509316785289-025f5b846b35', 'Nature', TRUE, '2023-10-18'),
('Ancient Temple', 'Historic architecture with intricate details', 'https://images.unsplash.com/photo-1548013146-72479768bada', 'Architecture', FALSE, '2023-11-24'),
('Market Scene', 'Vibrant local market with vendors', 'https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb', 'Street', FALSE, '2023-12-30'),
('Mountain Lake', 'Serene lake reflecting mountain peaks', 'https://images.unsplash.com/photo-1439853949127-fa647821eba0', 'Nature', FALSE, '2024-01-15'),
('Modern Building', 'Contemporary architecture with glass facade', 'https://images.unsplash.com/photo-1487958449943-2429e8be8625', 'Architecture', TRUE, '2024-02-20');