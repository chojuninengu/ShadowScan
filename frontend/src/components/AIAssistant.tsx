import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bot, 
  Send, 
  Brain, 
  Lightbulb, 
  Shield, 
  AlertCircle,
  TrendingUp,
  Zap
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  type?: "analysis" | "suggestion" | "alert";
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! I'm your AI Privacy Guardian. I help you understand where your personal information is exposed online and provide actionable steps to protect your digital privacy. What would you like to know?",
    timestamp: new Date(Date.now() - 300000),
    type: "analysis"
  },
  {
    id: "2",
    role: "assistant",
    content: "🚨 I've found your email in 3 major data breaches, including LinkedIn (2021) where passwords were compromised. Your username 'john_doe_87' is also actively sharing personal info on 5 platforms. Let me help you secure these exposures.",
    timestamp: new Date(Date.now() - 120000),
    type: "alert"
  }
];

const quickActions = [
  { label: "Analyze Exposures", icon: Brain, action: "analyze_scan" },
  { label: "Privacy Assessment", icon: Shield, action: "risk_assessment" },
  { label: "Protection Plan", icon: Lightbulb, action: "remediation" },
  { label: "Breach Monitoring", icon: TrendingUp, action: "threat_intel" }
];

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Your email appears in the LinkedIn 2021 breach affecting 700M users. I recommend changing passwords for all accounts and enabling 2FA. Would you like specific steps for each platform?",
        "I've detected your phone number in 3 public directories. Consider using a Google Voice number for online accounts and requesting removal from these directories.",
        "Your username pattern suggests you were born in 1987. This makes you vulnerable to social engineering. I can help you create more secure usernames.",
        "Your profile photo has been cached by 5 different websites. I can guide you through requesting removal and preventing future image indexing."
      ];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        type: "analysis"
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleQuickAction = (action: string) => {
    const actionMessages: Record<string, string> = {
      analyze_scan: "Please analyze my personal data exposures and highlight the most critical privacy risks.",
      risk_assessment: "Can you provide a comprehensive privacy risk assessment for my digital footprint?",
      remediation: "Generate a step-by-step plan to remove or secure my exposed personal information.",
      threat_intel: "What's the latest information about data breaches that might affect me?"
    };

    if (actionMessages[action]) {
      setInput(actionMessages[action]);
    }
  };

  return (
    <Card className="cyber-border bg-card/50 backdrop-blur-sm h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center animate-cyber-glow">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <div className="text-lg font-bold">AI Privacy Guardian</div>
            <div className="text-sm text-muted-foreground font-normal">
              Your personal digital protection companion
            </div>
          </div>
          <Badge className="ml-auto bg-cyber-green/20 text-cyber-green border-cyber-green/30">
            <Zap className="w-3 h-3 mr-1" />
            Online
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col space-y-4">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2 md:gap-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="text-xs md:text-sm h-8 md:h-10 bg-secondary/50 hover:bg-primary/20 hover:border-primary/50 min-h-[2.5rem]"
              onClick={() => handleQuickAction(action.action)}
            >
              <action.icon className="w-3 h-3 md:w-4 md:h-4 mr-1" />
              {action.label}
            </Button>
          ))}
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground ml-4"
                      : "bg-secondary/50 border border-border/50"
                  }`}
                >
                  {message.role === "assistant" && message.type && (
                    <div className="flex items-center gap-2 mb-2 text-xs">
                      {message.type === "analysis" && <Brain className="w-3 h-3 text-primary" />}
                      {message.type === "suggestion" && <Lightbulb className="w-3 h-3 text-cyber-yellow" />}
                      {message.type === "alert" && <AlertCircle className="w-3 h-3 text-destructive" />}
                      <span className="text-muted-foreground uppercase tracking-wide">
                        {message.type}
                      </span>
                    </div>
                  )}
                  <div className="text-sm">{message.content}</div>
                  <div className="text-xs text-muted-foreground mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-secondary/50 border border-border/50 p-3 rounded-lg">
                  <div className="flex items-center gap-1">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">AI is analyzing...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="flex gap-2 md:gap-3">
          <Input
            placeholder="Ask about your privacy risks, get protection advice..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isTyping && handleSend()}
            className="flex-1 bg-secondary/50 border-border/50 focus:border-primary focus:ring-primary/20 h-10 md:h-12 text-sm md:text-base"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            size="icon"
            className="bg-gradient-primary hover:shadow-cyber min-w-[2.5rem] md:min-w-[3rem]"
          >
            <Send className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}