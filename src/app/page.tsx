"use client";

import React, { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import ScreenshotCarousel from "../components/ScreenshotCarousel";
import FeatureBullets from "../components/FeatureBullets";
// import SignInCTA from "../components/SignInCTA";
import GetStartedButton from "../components/GetStartedButton";
import FederatedSignIn from "../components/FederatedSignIn";
import { loadGoogleScript, initializeGoogleSignIn } from "../lib/oauth/google";
import { signInMicrosoft } from "../lib/oauth/microsoft";

export default function Home() {
  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
    if (!clientId) {
      console.error("Google OAuth client ID is missing. Please set NEXT_PUBLIC_GOOGLE_CLIENT_ID environment variable.");
      return;
    }
    loadGoogleScript(clientId)
      .then(() => {
        initializeGoogleSignIn(clientId, (user, error) => {
          if (user) {
            console.log("Google user signed in:", user);
            // TODO: Persist user record and redirect
          } else if (error) {
            console.error("Google sign-in error:", error);
          }
        });
      })
      .catch((err) => {
        console.error("Failed to load Google OAuth script:", err);
      });
  }, []);

  const handleGoogleSignIn = () => {
    try {
      window.google.accounts.id.prompt();
    } catch (error) {
      console.error("Google sign-in prompt error:", error);
    }
  };

  const handleMicrosoftSignIn = async () => {
    try {
      const token = await signInMicrosoft();
      console.log("Microsoft user signed in, token:", token);
      // TODO: Persist user record and redirect
    } catch (error) {
      console.error("Microsoft sign-in error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen w-full bg-white font-sans">
      <main className="flex flex-col items-center w-full max-w-7xl gap-8 px-6 sm:px-8 md:px-12">
        <HeroSection />
        <ScreenshotCarousel />
        <FeatureBullets />
        <div className="flex flex-col sm:flex-row gap-6 mt-6 w-full max-w-md">
          <FederatedSignIn
            onGoogleSignIn={handleGoogleSignIn}
            onMicrosoftSignIn={handleMicrosoftSignIn}
          />
          <GetStartedButton />
          <div className="mt-6">
            <a
              href="/dashboard"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Go to Dashboard
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
