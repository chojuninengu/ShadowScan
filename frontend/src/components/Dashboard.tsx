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
  Clock
} from "lucide-react";

const recentScans = [
  {
    target: "john.doe@email.com",
    status: "completed",
    exposures: 12,
    sources: 3,
    timestamp: "2 minutes ago",
    risk: "high"
  },
  {
    target: "john_doe",
    status: "running",
    exposures: 4,
    sources: 2,
    timestamp: "5 minutes ago",
    risk: "medium"
  },
  {
    target: "+1-555-0123",
    status: "completed",
    exposures: 2,
    sources: 1,
    timestamp: "1 hour ago",
    risk: "low"
  }
];

const exposureCategories = [
  { category: "Email Addresses", count: 8, color: "bg-destructive", percentage: 35, trend: "+2 new" },
  { category: "Usernames", count: 12, color: "bg-cyber-orange", percentage: 28, trend: "+1 new" },
  { category: "Phone Numbers", count: 3, color: "bg-cyber-yellow", percentage: 20, trend: "No change" },
  { category: "Social Profiles", count: 15, color: "bg-cyber-green", percentage: 17, trend: "+3 new" }
];

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
            <div className="text-3xl font-bold text-primary">47</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline w-3 h-3 mr-1" />
              +3 this week
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
            <div className="text-3xl font-bold text-destructive">23</div>
            <p className="text-xs text-muted-foreground">
              <AlertTriangle className="inline w-3 h-3 mr-1" />
              6 new this week
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
            <div className="text-3xl font-bold text-cyber-green">1,247</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline w-3 h-3 mr-1" />
              +147 new sources
            </p>
          </CardContent>
        </Card>

        <Card className="cyber-border bg-card/50 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium">Protection Score</CardTitle>
            <CheckCircle className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-accent">87%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline w-3 h-3 mr-1" />
              +5% this month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Scans */}
        <Card className="cyber-border bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Recent Personal Scans
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentScans.map((scan, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border/50">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${
                    scan.status === 'completed' ? 'bg-cyber-green' : 
                    scan.status === 'running' ? 'bg-primary animate-pulse' : 'bg-destructive'
                  }`} />
                  <div>
                    <div className="font-medium">{scan.target}</div>
                    <div className="text-sm text-muted-foreground">
                      {scan.exposures} exposures • {scan.sources} sources • {scan.timestamp}
                    </div>
                  </div>
                </div>
                <Badge variant={
                  scan.risk === 'high' ? 'destructive' : 
                  scan.risk === 'medium' ? 'secondary' : 'outline'
                } className={
                  scan.risk === 'high' ? 'bg-destructive/20 text-destructive border-destructive/30' :
                  scan.risk === 'medium' ? 'bg-cyber-orange/20 text-cyber-orange border-cyber-orange/30' :
                  'bg-cyber-green/20 text-cyber-green border-cyber-green/30'
                }>
                  {scan.risk}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Risk Distribution */}
        <Card className="cyber-border bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-primary" />
              Exposure Categories
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {exposureCategories.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{category.category}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{category.count} found</span>
                    <span className="text-xs text-cyber-green">{category.trend}</span>
                  </div>
                </div>
                <Progress 
                  value={category.percentage} 
                  className="h-2"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}