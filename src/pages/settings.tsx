import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SettingsPanel } from "@/components/SettingsPanel";

const Settings = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        <div className="max-w-3xl mx-auto">
          <SettingsPanel />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;