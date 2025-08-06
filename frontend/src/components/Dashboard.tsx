import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  Zap, 
  Globe,
  Eye,
  Clock,
  Brain
} from "lucide-react";

// This would come from your API/state management
const mockData = {
  totalScans: 0,
  dataExposures: 0,
  sourcesMonitored: 0,
  protectionScore: 0,
  recentScans: [],
  exposureCategories: []
};

export function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Your Digital Privacy Shield
        </h1>
        <p className="text-muted-foreground text-lg">
          AI-powered personal information exposure detection and protection
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="cyber-border bg-card/50 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium">Personal Scans</CardTitle>
            <Shield className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-primary">{mockData.totalScans}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline w-3 h-3 mr-1" />
              Start your first scan
            </p>
          </CardContent>
        </Card>

        <Card className="cyber-border bg-card/50 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyber-green/10 to-transparent" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium">Data Exposures</CardTitle>
            <Eye className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-destructive">{mockData.dataExposures}</div>
            <p className="text-xs text-muted-foreground">
              <AlertTriangle className="inline w-3 h-3 mr-1" />
              No exposures found
            </p>
          </CardContent>
        </Card>

        <Card className="cyber-border bg-card/50 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-destructive/10 to-transparent" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium">Sources Monitored</CardTitle>
            <Globe className="h-4 w-4 text-cyber-green" />
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-cyber-green">{mockData.sourcesMonitored}</div>
            <p className="text-xs text-muted-foreground">
              <CheckCircle className="inline w-3 h-3 mr-1" />
              Active monitoring
            </p>
          </CardContent>
        </Card>

        <Card className="cyber-border bg-card/50 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium">Protection Score</CardTitle>
            <Zap className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-accent">{mockData.protectionScore}%</div>
            <Progress value={mockData.protectionScore} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="cyber-border bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="p-4 md:p-6 rounded-lg bg-secondary/50 border border-border/50 hover:border-primary/50 transition-colors cursor-pointer min-h-[5rem] md:min-h-[6rem]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Shield className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm md:text-base">Start New Scan</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Scan for personal data exposure</p>
                </div>
              </div>
            </div>

            <div className="p-4 md:p-6 rounded-lg bg-secondary/50 border border-border/50 hover:border-primary/50 transition-colors cursor-pointer min-h-[5rem] md:min-h-[6rem]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Eye className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm md:text-base">View Reports</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Check your exposure history</p>
                </div>
              </div>
            </div>

            <div className="p-4 md:p-6 rounded-lg bg-secondary/50 border border-border/50 hover:border-primary/50 transition-colors cursor-pointer min-h-[5rem] md:min-h-[6rem]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Brain className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm md:text-base">AI Assistant</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Get privacy recommendations</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="cyber-border bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          {mockData.recentScans.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No scans yet</h3>
              <p className="text-muted-foreground mb-4">
                Start your first privacy scan to begin monitoring your personal information.
              </p>
              <button className="bg-gradient-primary hover:shadow-cyber px-4 md:px-6 py-2 md:py-3 rounded-lg text-primary-foreground font-medium text-sm md:text-base min-h-[2.5rem] md:min-h-[3rem]">
                Start First Scan
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* This would show actual scan history */}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}