import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DownloadHistory } from "@/components/DownloadHistory";

const History = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Download History</h1>
        <DownloadHistory />
      </main>
      
      <Footer />
    </div>
  );
};

export default History;