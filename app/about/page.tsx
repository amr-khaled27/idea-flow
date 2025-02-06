"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/app/providers/AuthProvider";
import { handleSignUpWithGoogle } from "@/app/utils/auth";
import { NavHeader } from "@/components/nav-header";

const About = () => {
  const auth = useAuth();
  const user = auth?.user;

  const handleCTAClick = () => {
    if (user) {
      window.location.href = "/dashboard";
    } else {
      handleSignUpWithGoogle();
    }
  };

  return (
    <>
      <NavHeader />
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Breakthrough Ideas
              <span className="text-primary block mt-2">Powered by AI</span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
              Supercharge your creativity with our Gemini-driven idea generator.
              Perfect for innovators, creators, and entrepreneurs who are ready
              to push boundaries.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleCTAClick} size="lg" className="gap-2">
                Create An Account Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
