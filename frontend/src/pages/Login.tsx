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
  ArrowLeft,
  Github
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { apiService } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import heroImage from "@/assets/hero-bg.jpg";

const Login = () => {
  console.log("Login component rendered");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login form submitted", { email, password, rememberMe });
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    console.log("Making API call to login...");
    
    try {
      const response = await apiService.login({ email, password });
      
      console.log("Login successful:", response);
      
      // For now, we'll create a mock user object since the backend only returns a token
      // In a real app, you might want to decode the JWT or make another API call to get user info
      const mockUser = {
        id: "user-id", // This would come from JWT decode or user API
        username: email.split('@')[0], // Temporary username from email
        email: email,
      };
      
      login(response.token, mockUser);
      
      toast({
        title: "Success",
        description: "Successfully logged in!",
      });
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "An error occurred during login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGitHubLogin = () => {
    console.log("GitHub login clicked");
    alert("GitHub login clicked!"); // Temporary alert for testing
    toast({
      title: "GitHub Login",
      description: "GitHub authentication is not implemented yet. Please use email login.",
    });
  };

  const handleForgotPassword = () => {
    console.log("Forgot password clicked");
    alert("Forgot password clicked!"); // Temporary alert for testing
    toast({
      title: "Forgot Password",
      description: "Password reset functionality is not implemented yet.",
    });
  };

  const handleRememberMeChange = (checked: boolean) => {
    console.log("Remember me checkbox changed:", checked);
    alert(`Remember me changed to: ${checked}`); // Temporary alert for testing
    setRememberMe(checked);
  };

  const handleSignInClick = () => {
    console.log("Sign In button clicked");
    alert("Sign In button clicked!"); // Temporary alert for testing
  };

  const handleTestClick = () => {
    alert("Test button clicked! This proves buttons work!");
  };

  const handleBasicButtonClick = () => {
    alert("Basic HTML button clicked! This should definitely work!");
  };

  console.log("Login form state:", { 
    hasEmail: !!email,
    hasPassword: !!password,
    rememberMe,
    isLoading 
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
                Welcome Back
              </h2>
              <p className="text-muted-foreground mt-2">
                Sign in to your ShadowScan account
              </p>
            </div>
          </div>

          {/* Test Buttons */}
          <div className="space-y-2">
            <Button 
              onClick={handleTestClick}
              className="w-full bg-red-500 hover:bg-red-600"
            >
              🧪 TEST BUTTON - Click me!
            </Button>
            
            <button
              onClick={handleBasicButtonClick}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md"
            >
              🔵 BASIC HTML BUTTON - Click me!
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
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
                  value={email}
                  onChange={(e) => {
                    console.log("Email changed:", e.target.value);
                    setEmail(e.target.value);
                  }}
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    console.log("Password changed:", e.target.value);
                    setPassword(e.target.value);
                  }}
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

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe}
                  onCheckedChange={handleRememberMeChange}
                  disabled={isLoading}
                />
                <Label htmlFor="remember" className="text-muted-foreground cursor-pointer">
                  Remember me
                </Label>
              </div>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-primary hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-primary hover:shadow-cyber"
              onClick={handleSignInClick}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                <span>Sign In</span>
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
            className="w-full border-border/50 hover:bg-secondary/50" 
            disabled={isLoading}
            onClick={handleGitHubLogin}
          >
            <Github className="w-4 h-4 mr-2" />
            Continue with GitHub
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login; 