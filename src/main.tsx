import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App.tsx';
import './index.css';

// ✅ Only declare once
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY} 
      afterSignOutUrl="/"
      signUpUrl="/sign-up"
      appearance={{
        elements: {
          footer: "text-[#B3B3B3]",
          footerAction: "text-[#B3B3B3]",
          footerActionLink: "text-[#FF7A00] hover:text-[#FFB347]",
          formButtonPrimary: "bg-[#FF7A00] text-black hover:bg-[#FFB347]",
          card: "bg-[#121212] border border-[#1E1E1E] shadow-xl",
          headerTitle: "text-white",
          headerSubtitle: "text-[#B3B3B3]",
          socialButtonsBlockButton: "bg-[#1E1E1E] border-[#FF7A00]/30 text-white hover:bg-[#FF7A00]/10",
          formFieldInput: "bg-[#1E1E1E] border-[#FF7A00]/30 text-white",
          formFieldLabel: "text-[#B3B3B3]",
          identityPreviewEditButton: "text-[#FF7A00] hover:text-[#FFB347]",
          formFieldAction: "text-[#FF7A00] hover:text-[#FFB347]",
          alertText: "text-[#B3B3B3]",
          alert: "bg-[#1E1E1E] border-[#FF7A00]/30",
          devBar: "hidden",
          otpCodeFieldInput: "bg-[#1E1E1E] border-[#FF7A00]/30 text-white",
          otpCodeField: "text-white",
          phoneNumberInput: "text-white",
          phoneNumberInputField: "text-white"
        }
      }}
    >
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
