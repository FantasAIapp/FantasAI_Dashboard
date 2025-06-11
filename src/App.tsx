import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, SignIn, SignUp } from "@clerk/clerk-react";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route
            path="/sign-in/*"
            element={
              <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
                <SignIn 
                  appearance={{
                    elements: {
                      rootBox: "mx-auto w-full max-w-md",
                      card: "bg-[#121212] border border-[#1E1E1E] shadow-xl",
                      headerTitle: "text-white",
                      headerSubtitle: "text-[#B3B3B3]",
                      socialButtonsBlockButton: "bg-[#1E1E1E] border-[#FF7A00]/30 text-white hover:bg-[#FF7A00]/10",
                      formButtonPrimary: "bg-[#FF7A00] text-black hover:bg-[#FFB347]",
                      footerActionLink: "text-[#FF7A00] hover:text-[#FFB347]",
                      formFieldInput: "bg-[#1E1E1E] border-[#FF7A00]/30 text-white",
                      formFieldLabel: "text-[#B3B3B3]",
                      identityPreviewEditButton: "text-[#FF7A00] hover:text-[#FFB347]",
                      formFieldAction: "text-[#FF7A00] hover:text-[#FFB347]",
                      alertText: "text-[#B3B3B3]",
                      alert: "bg-[#1E1E1E] border-[#FF7A00]/30",
                    }
                  }}
                />
              </div>
            }
          />
          <Route
            path="/sign-up/*"
            element={
              <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
                <SignUp 
                  appearance={{
                    elements: {
                      rootBox: "mx-auto w-full max-w-md",
                      card: "bg-[#121212] border border-[#1E1E1E] shadow-xl",
                      headerTitle: "text-white",
                      headerSubtitle: "text-[#B3B3B3]",
                      socialButtonsBlockButton: "bg-[#1E1E1E] border-[#FF7A00]/30 text-white hover:bg-[#FF7A00]/10",
                      formButtonPrimary: "bg-[#FF7A00] text-black hover:bg-[#FFB347]",
                      footerActionLink: "text-[#FF7A00] hover:text-[#FFB347]",
                      formFieldInput: "bg-[#1E1E1E] border-[#FF7A00]/30 text-white",
                      formFieldLabel: "text-[#B3B3B3]",
                      identityPreviewEditButton: "text-[#FF7A00] hover:text-[#FFB347]",
                      formFieldAction: "text-[#FF7A00] hover:text-[#FFB347]",
                      alertText: "text-[#B3B3B3]",
                      alert: "bg-[#1E1E1E] border-[#FF7A00]/30",
                    }
                  }}
                />
              </div>
            }
          />
          <Route
            path="/"
            element={
              <>
                <SignedIn>
                  <Index />
                </SignedIn>
                <SignedOut>
                  <Navigate to="/sign-in" replace />
                </SignedOut>
              </>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
