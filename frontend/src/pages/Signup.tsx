import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  User,
  Github,
  CheckCircle
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { apiService } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import heroImage from "@/assets/hero-bg.jpg";

const Signup = () => {
  console.log("Signup component rendered");
  
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleInputChange = (field: string, value: string) => {
    console.log(`Input change: ${field} = ${value}`);
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup form submitted", { formData, agreedToTerms });
    alert("Signup form submitted!"); // Temporary alert for testing
    
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    if (!agreedToTerms) {
      toast({
        title: "Error",
        description: "Please agree to the terms and privacy policy",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    console.log("Making API call to register user...");
    
    try {
      const response = await apiService.register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      
      console.log("Registration successful:", response);
      
      // For now, we'll create a mock user object since the backend only returns a token
      // In a real app, you might want to decode the JWT or make another API call to get user info
      const mockUser = {
        id: "user-id", // This would come from JWT decode or user API
        username: formData.username,
        email: formData.email,
      };
      
      login(response.token, mockUser);
      
      toast({
        title: "Success",
        description: "Account created successfully! Welcome to ShadowScan!",
      });
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Signup Failed",
        description: error instanceof Error ? error.message : "An error occurred during signup",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGitHubSignup = () => {
    console.log("GitHub signup clicked");
    alert("GitHub signup clicked!"); // Temporary alert for testing
    toast({
      title: "GitHub Signup",
      description: "GitHub authentication is not implemented yet. Please use email signup.",
    });
  };

  const handleTermsClick = () => {
    console.log("Terms link clicked");
    alert("Terms link clicked!"); // Temporary alert for testing
    toast({
      title: "Terms of Service",
      description: "Terms of service page is not implemented yet.",
    });
  };

  const handlePrivacyClick = () => {
    console.log("Privacy link clicked");
    alert("Privacy link clicked!"); // Temporary alert for testing
    toast({
      title: "Privacy Policy",
      description: "Privacy policy page is not implemented yet.",
    });
  };

  const handleTermsChange = (checked: boolean) => {
    console.log("Terms checkbox changed:", checked);
    alert(`Terms checkbox changed to: ${checked}`); // Temporary alert for testing
    setAgreedToTerms(checked);
  };

  const handleCreateAccountClick = () => {
    console.log("Create Account button clicked");
    alert("Create Account button clicked!"); // Temporary alert for testing
  };

  console.log("Form validation:", { 
    hasUsername: !!formData.username,
    hasEmail: !!formData.email,
    hasPassword: !!formData.password,
    hasConfirmPassword: !!formData.confirmPassword,
    passwordsMatch: formData.password === formData.confirmPassword,
    agreedToTerms 
  });

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
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center animate-cyber-glow">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  ShadowScan
                </h1>
                <p className="text-xs text-muted-foreground">Privacy Guardian</p>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <Github className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <Card className="w-full max-w-md cyber-border bg-card/50 backdrop-blur-sm p-8 space-y-6">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary shadow-cyber animate-cyber-glow">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Create Account
              </h2>
              <p className="text-muted-foreground mt-2">
                Join ShadowScan and protect your privacy
              </p>
            </div>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">
                Username
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  className="pl-10 bg-secondary/50 border-border/50 focus:border-primary focus:ring-primary/20"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="pl-10 bg-secondary/50 border-border/50 focus:border-primary focus:ring-primary/20"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="pl-10 pr-10 bg-secondary/50 border-border/50 focus:border-primary focus:ring-primary/20"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => {
                    console.log("Toggle password visibility");
                    alert("Toggle password clicked!"); // Temporary alert for testing
                    setShowPassword(!showPassword);
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className="pl-10 pr-10 bg-secondary/50 border-border/50 focus:border-primary focus:ring-primary/20"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => {
                    console.log("Toggle confirm password visibility");
                    alert("Toggle confirm password clicked!"); // Temporary alert for testing
                    setShowConfirmPassword(!showConfirmPassword);
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-sm text-destructive">Passwords do not match</p>
              )}
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={handleTermsChange}
                className="mt-1"
                disabled={isLoading}
              />
              <Label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
                I agree to the{" "}
                <button
                  type="button"
                  onClick={handleTermsClick}
                  className="text-primary hover:underline"
                >
                  Terms of Service
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  onClick={handlePrivacyClick}
                  className="text-primary hover:underline"
                >
                  Privacy Policy
                </button>
              </Label>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-primary hover:shadow-cyber min-h-[3rem]"
              onClick={handleCreateAccountClick}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  <span className="text-sm md:text-base">Creating account...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-sm md:text-base">Create Account</span>
                </div>
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button 
            variant="outline" 
            size="lg"
            className="w-full border-border/50 hover:bg-secondary/50 min-h-[3rem]" 
            disabled={isLoading}
            onClick={handleGitHubSignup}
          >
            <Github className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            <span className="text-sm md:text-base">Continue with GitHub</span>
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Signup; 