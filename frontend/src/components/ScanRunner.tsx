import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Shield, Search, Zap, Globe, AlertTriangle } from "lucide-react";

interface ScanRunnerProps {
  onScanStart?: (target: string) => void;
}

export function ScanRunner({ onScanStart }: ScanRunnerProps) {
  const [target, setTarget] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const handleScan = async () => {
    if (!target.trim()) return;
    
    setIsScanning(true);
    setScanProgress(0);
    onScanStart?.(target);

    // Simulate scan progress
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  return (
    <Card className="relative overflow-hidden cyber-border bg-card/50 backdrop-blur-sm">
      <div className="absolute inset-0 cyber-grid opacity-20" />
      
      <div className="relative p-4 md:p-8 space-y-6">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-primary shadow-cyber animate-cyber-glow">
            <Shield className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground" />
          </div>
          
          <div>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Personal Privacy Scan
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mt-2">
              AI-powered detection of your personal information exposure
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-primary" />
            <Input
              placeholder="Enter email, username, or phone number..."
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="pl-10 md:pl-12 h-12 md:h-14 text-base md:text-lg bg-secondary/50 border-border/50 focus:border-primary focus:ring-primary/20"
              onKeyDown={(e) => e.key === "Enter" && !isScanning && handleScan()}
            />
          </div>

          <Button
            onClick={handleScan}
            disabled={!target.trim() || isScanning}
            size="xl"
            className="w-full bg-gradient-primary hover:shadow-cyber transition-all duration-300 min-h-[3.5rem] md:min-h-[3.5rem]"
          >
            {isScanning ? (
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                <span className="text-sm md:text-base">Scanning... {Math.round(scanProgress)}%</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 md:gap-3">
                <Search className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-sm md:text-base">Start Privacy Scan</span>
                <Zap className="w-4 h-4 md:w-5 md:h-5" />
              </div>
            )}
          </Button>
        </div>

        {isScanning && (
          <div className="space-y-4">
            <div className="h-2 md:h-3 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-primary transition-all duration-300 ease-out"
                style={{ width: `${scanProgress}%` }}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
              <div className="flex items-center gap-2 text-cyber-green">
                <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse" />
                <span>Data Breach Search</span>
              </div>
              <div className="flex items-center gap-2 text-cyber-orange">
                <div className="w-2 h-2 bg-cyber-orange rounded-full animate-pulse" />
                <span>Social Media Scan</span>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span>Web Content Analysis</span>
              </div>
              <div className="flex items-center gap-2 text-accent">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span>Dark Web Monitor</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <AlertTriangle className="w-3 h-3 md:w-4 md:h-4" />
          <span className="text-center">Only scan your own personal information</span>
        </div>
      </div>
    </Card>
  );
}