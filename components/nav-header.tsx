"use client";

import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/app/providers/AuthProvider";
import { useState } from "react";
import ProfileSidebar from "@/components/ProfileSidebar";
import { AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export function NavHeader() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const auth = useAuth();

  const user = auth?.user;

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="fixed w-full bg-background/80 backdrop-blur-sm border-b z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <Sparkles className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-bold">IdeaFlow</span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {user ? (
              <>
                <button
                  onClick={toggleSidebar}
                  className="active:scale-95 w-8 h-8"
                >
                  {user.photoURL ? (
                    <Image
                      src={user.photoURL}
                      alt="Profile"
                      className="h-8 w-8 rounded-full"
                      width={32}
                      height={32}
                    />
                  ) : (
                    <div className="border border-input w-full h-full centered rounded-sm">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="h-8 w-8 text-primary"
                      />
                    </div>
                  )}
                </button>

                <AnimatePresence>
                  {isSidebarOpen && (
                    <ProfileSidebar toggleSidebar={toggleSidebar} />
                  )}
                </AnimatePresence>
              </>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
