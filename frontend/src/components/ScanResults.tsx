import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  AlertTriangle, 
  Shield, 
  Eye, 
  ExternalLink, 
  Download,
  Filter,
  Search,
  Globe,
  Database,
  Server,
  Cloud
} from "lucide-react";

const mockResults = [
  {
    id: "1",
    asset: "john.doe@email.com",
    type: "Email Address",
    risk: "critical",
    description: "Found in 3 major data breaches with password exposure",
    sources: ["LinkedIn 2021", "Adobe 2013", "Dropbox 2012"],
    breaches: ["HaveIBeenPwned", "DeHashed", "BreachDirectory"],
    lastSeen: "2 minutes ago",
    score: 9.2
  },
  {
    id: "2",
    asset: "john_doe_87",
    type: "Username",
    risk: "high",
    description: "Active on 5 platforms with personal information visible",
    sources: ["Twitter", "Instagram", "GitHub", "Reddit"],
    breaches: ["Gaming Forums", "Social Platforms"],
    lastSeen: "5 minutes ago",
    score: 7.8
  },
  {
    id: "3",
    asset: "+1-555-0123",
    type: "Phone Number",
    risk: "medium",
    description: "Listed in public directories and old resume",
    sources: ["Whitepages", "PDF Documents", "Company Directory"],
    breaches: ["Public Records"],
    lastSeen: "10 minutes ago",
    score: 6.1
  },
  {
    id: "4",
    asset: "123.45.67.89",
    type: "IP Address",
    risk: "high",
    description: "Home IP linked to personal gaming accounts",
    sources: ["Gaming Forums", "VPN Logs", "Torrent Sites"],
    breaches: ["Gaming Service Leak"],
    lastSeen: "15 minutes ago",
    score: 8.1
  },
  {
    id: "5",
    asset: "profile_photo.jpg",
    type: "Personal Image",
    risk: "low",
    description: "Profile photo found in cached web pages",
    sources: ["LinkedIn Cache", "Company Website Archive"],
    breaches: ["None"],
    lastSeen: "1 hour ago",
    score: 3.2
  }
];

const getRiskColor = (risk: string) => {
  switch (risk) {
    case "critical": return "bg-destructive/20 text-destructive border-destructive/30";
    case "high": return "bg-cyber-orange/20 text-cyber-orange border-cyber-orange/30";
    case "medium": return "bg-cyber-yellow/20 text-cyber-yellow border-cyber-yellow/30";
    case "low": return "bg-cyber-green/20 text-cyber-green border-cyber-green/30";
    default: return "bg-muted/20 text-muted-foreground border-muted/30";
  }
};

const getAssetIcon = (type: string) => {
  switch (type) {
    case "Email Address": return Globe;
    case "Username": return Shield;
    case "Phone Number": return AlertTriangle;
    case "IP Address": return Server;
    case "Personal Image": return Eye;
    default: return Globe;
  }
};

export function ScanResults() {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("score");

  const riskCounts = {
    critical: mockResults.filter(r => r.risk === "critical").length,
    high: mockResults.filter(r => r.risk === "high").length,
    medium: mockResults.filter(r => r.risk === "medium").length,
    low: mockResults.filter(r => r.risk === "low").length
  };

  const totalAssets = mockResults.length;
  const riskScore = Math.round(mockResults.reduce((acc, r) => acc + r.score, 0) / totalAssets * 10) / 10;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Personal Data Exposure Report
            </h2>
            <p className="text-muted-foreground">john.doe@email.com privacy scan complete</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-secondary/50">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="bg-secondary/50">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="cyber-border bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{totalAssets}</div>
              <div className="text-sm text-muted-foreground">Data Types</div>
            </CardContent>
          </Card>
          
          <Card className="cyber-border bg-card/50 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-destructive/10 to-transparent" />
            <CardContent className="p-4 text-center relative">
              <div className="text-2xl font-bold text-destructive">{riskCounts.critical}</div>
              <div className="text-sm text-muted-foreground">Critical</div>
            </CardContent>
          </Card>
          
          <Card className="cyber-border bg-card/50 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyber-orange/10 to-transparent" />
            <CardContent className="p-4 text-center relative">
              <div className="text-2xl font-bold text-cyber-orange">{riskCounts.high}</div>
              <div className="text-sm text-muted-foreground">High</div>
            </CardContent>
          </Card>
          
          <Card className="cyber-border bg-card/50 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyber-yellow/10 to-transparent" />
            <CardContent className="p-4 text-center relative">
              <div className="text-2xl font-bold text-cyber-yellow">{riskCounts.medium}</div>
              <div className="text-sm text-muted-foreground">Medium</div>
            </CardContent>
          </Card>
          
          <Card className="cyber-border bg-card/50 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyber-green/10 to-transparent" />
            <CardContent className="p-4 text-center relative">
              <div className="text-2xl font-bold text-cyber-green">{riskCounts.low}</div>
              <div className="text-sm text-muted-foreground">Low</div>
            </CardContent>
          </Card>
        </div>

        {/* Risk Score */}
        <Card className="cyber-border bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Privacy Risk Score</h3>
                <p className="text-sm text-muted-foreground">AI-calculated based on exposure severity and breach impact</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-destructive">{riskScore}/10</div>
                <Badge className="bg-destructive/20 text-destructive border-destructive/30">
                  High Risk
                </Badge>
              </div>
            </div>
            <Progress value={riskScore * 10} className="h-3" />
          </CardContent>
        </Card>
      </div>

      {/* Results Table */}
      <Card className="cyber-border bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary" />
            Personal Data Exposures
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead>Personal Data</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Sources</TableHead>
                <TableHead>Last Seen</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockResults.map((result) => {
                const AssetIcon = getAssetIcon(result.type);
                return (
                  <TableRow key={result.id} className="border-border/50 hover:bg-secondary/20">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <AssetIcon className="w-4 h-4 text-primary" />
                        <div>
                          <div className="font-medium">{result.asset}</div>
                          <div className="text-sm text-muted-foreground">
                            {result.description}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-secondary/50">
                        {result.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRiskColor(result.risk)}>
                        {result.risk.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{result.score}</span>
                        <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${
                              result.score >= 8 ? 'bg-destructive' :
                              result.score >= 6 ? 'bg-cyber-orange' :
                              result.score >= 4 ? 'bg-cyber-yellow' : 'bg-cyber-green'
                            }`}
                            style={{ width: `${result.score * 10}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {result.sources.slice(0, 2).map((source, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs bg-destructive/10 text-destructive border-destructive/30">
                            {source}
                          </Badge>
                        ))}
                        {result.sources.length > 2 && (
                          <Badge variant="outline" className="text-xs bg-muted/10 text-muted-foreground border-muted/30">
                            +{result.sources.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {result.lastSeen}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Search className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}