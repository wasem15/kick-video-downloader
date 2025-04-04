import { Link } from "react-router-dom";
import { Github } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Kick Stream Downloader. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <Link to="https://github.com" className="text-muted-foreground hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>
        
        <div className="mt-4 text-xs text-center text-muted-foreground">
          <p>This tool is for personal use only. Please respect Kick's Terms of Service.</p>
        </div>
      </div>
    </footer>
  );
}