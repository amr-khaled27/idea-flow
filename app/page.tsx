"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Lightbulb, Rocket, Brain, ArrowRight } from "lucide-react";
import { NavHeader } from "@/components/nav-header";
import { useAuth } from "./providers/AuthProvider";
import { handleSignUpWithGoogle } from "@/app/utils/auth";

export default function Home() {
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
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary transition-colors duration-300">
      <NavHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Unleash Your Creativity with
              <span className="text-primary block mt-2">
                AI-Powered Innovation
              </span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
              Unlock limitless creativity with our Gemini-powered idea
              generator. Perfect for entrepreneurs, creators, and innovators.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleCTAClick} size="lg" className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
              <Link href="/about">
                <Button size="lg" className="w-full" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
              <Lightbulb className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Instant Inspiration
              </h3>
              <p className="text-muted-foreground">
                Generate unique ideas in seconds with our advanced AI
                technology.
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
              <Brain className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Smart Refinement</h3>
              <p className="text-muted-foreground">
                Refine and expand your ideas with intelligent suggestions.
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
              <Rocket className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Rapid Prototyping</h3>
              <p className="text-muted-foreground">
                Turn ideas into actionable plans with our structured approach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Transform Your Ideas?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of innovators who are already using IdeaFlow to bring
            their ideas to life.
          </p>
          <Button onClick={handleCTAClick} size="lg" className="gap-2">
            Start Generating Ideas <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <span className="font-semibold">IdeaFlow</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © 2025 IdeaFlow. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
