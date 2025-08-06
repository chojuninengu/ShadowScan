import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dashboard } from "@/components/Dashboard";
import { ScanRunner } from "@/components/ScanRunner";
import { ScanResults } from "@/components/ScanResults";
import { AIAssistant } from "@/components/AIAssistant";
import { 
  Shield, 
  Zap, 
  Eye, 
  Brain, 
  Settings, 
  Github,
  Menu,
  X
} from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    { id: "dashboard", label: "Privacy Shield", icon: Shield },
    { id: "scan", label: "Personal Scan", icon: Zap },
    { id: "results", label: "Exposure Report", icon: Eye },
    { id: "ai", label: "AI Guardian", icon: Brain },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 cyber-grid opacity-5" />
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/95 to-background/90" />
      
      {/* Header */}
      <header className="relative z-10 border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center animate-cyber-glow">
                  <Shield className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  ShadowScan
                </h1>
                <p className="text-xs text-muted-foreground">Privacy Guardian</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge className="bg-cyber-green/20 text-cyber-green border-cyber-green/30">
                <div className="w-2 h-2 bg-cyber-green rounded-full mr-2 animate-pulse" />
                Online
              </Badge>
              
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <Github className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)] relative z-10">
        {/* Sidebar */}
        <aside className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 transition-transform duration-300 ease-in-out
          fixed lg:relative z-20 w-64 h-full bg-card/50 backdrop-blur-sm border-r border-border/50
        `}>
          <div className="p-4 md:p-6 space-y-4 md:space-y-6">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-2 md:gap-3 px-3 md:px-4 py-3 md:py-4 rounded-lg text-left transition-all duration-200 min-h-[3rem] md:min-h-[3.5rem] text-sm md:text-base
                    ${activeTab === item.id 
                      ? 'bg-gradient-primary text-primary-foreground shadow-cyber' 
                      : 'hover:bg-secondary/50 text-muted-foreground hover:text-foreground'
                    }
                  `}
                >
                  <item.icon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-10"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsContent value="dashboard" className="mt-0">
                <Dashboard />
              </TabsContent>
              
              <TabsContent value="scan" className="mt-0">
                <div className="max-w-2xl mx-auto">
                  <ScanRunner onScanStart={(target) => console.log("Scanning personal data for:", target)} />
                </div>
              </TabsContent>
              
              <TabsContent value="results" className="mt-0">
                <ScanResults />
              </TabsContent>
              
              <TabsContent value="ai" className="mt-0">
                <div className="max-w-4xl mx-auto">
                  <AIAssistant />
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="mt-0">
                <Card className="cyber-border bg-card/50 backdrop-blur-sm p-8">
                  <div className="text-center space-y-4">
                    <Settings className="w-16 h-16 mx-auto text-primary" />
                    <h2 className="text-2xl font-bold">Settings Panel</h2>
                    <p className="text-muted-foreground">
                      Configure your privacy settings, notification preferences, and data retention policies.
                    </p>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
