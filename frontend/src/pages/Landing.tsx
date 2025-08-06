import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Zap, 
  Eye, 
  Brain, 
  ArrowRight,
  Github,
  Lock,
  Users,
  Globe,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-bg.jpg";

const Landing = () => {
  const features = [
    {
      icon: Shield,
      title: "Privacy Shield",
      description: "AI-powered personal information exposure detection"
    },
    {
      icon: Eye,
      title: "Real-time Monitoring",
      description: "Continuous scanning across multiple data sources"
    },
    {
      icon: Brain,
      title: "AI Guardian",
      description: "Intelligent threat assessment and recommendations"
    },
    {
      icon: Lock,
      title: "Secure & Private",
      description: "Your data never leaves your control"
    }
  ];

  const stats = [
    { value: "10M+", label: "Records Scanned" },
    { value: "500+", label: "Data Sources" },
    { value: "99.9%", label: "Accuracy Rate" },
    { value: "24/7", label: "Monitoring" }
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

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <Github className="w-4 h-4" />
              </Button>
              <Link to="/login">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="bg-gradient-primary hover:shadow-cyber">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-6">
              <Badge className="bg-cyber-green/20 text-cyber-green border-cyber-green/30">
                <div className="w-2 h-2 bg-cyber-green rounded-full mr-2 animate-pulse" />
                AI-Powered Privacy Protection
              </Badge>
              
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent leading-tight">
                Your Digital
                <br />
                Privacy Shield
              </h1>
              
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto">
                Discover and protect your personal information with AI-powered scanning across the dark web, data breaches, and public sources.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Link to="/signup">
                <Button size="xl" className="bg-gradient-primary hover:shadow-cyber text-base md:text-lg px-6 md:px-8 py-4 md:py-6 min-h-[3.5rem] md:min-h-[4rem]">
                  <Shield className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  Start Free Scan
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="xl" className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 border-border/50 hover:bg-secondary/50 min-h-[3.5rem] md:min-h-[4rem]">
                  <Lock className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-16 border-t border-border/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-3xl lg:text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Why Choose ShadowScan?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced AI technology combined with comprehensive data monitoring to keep your personal information secure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="cyber-border bg-card/50 backdrop-blur-sm p-6 text-center space-y-4 hover:shadow-cyber transition-all duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-primary shadow-cyber">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 border-t border-border/50">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Ready to Protect Your Privacy?
              </h2>
              <p className="text-xl text-muted-foreground">
                Join thousands of users who trust ShadowScan to monitor and protect their personal information.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Link to="/signup">
                <Button size="xl" className="bg-gradient-primary hover:shadow-cyber text-base md:text-lg px-6 md:px-8 py-4 md:py-6 min-h-[3.5rem] md:min-h-[4rem]">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  Start Your Free Trial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 bg-card/30 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-gradient-primary flex items-center justify-center">
                <Shield className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">© 2024 ShadowScan. All rights reserved.</span>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Contact</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing; 