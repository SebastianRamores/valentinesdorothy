import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "@/pages/Landing";
import Valentine from "@/pages/Valentine";
import NotFound from "@/pages/not-found";
import { BackgroundMusic } from "@/components/BackgroundMusic";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/valentine" component={Valentine} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BackgroundMusic />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
