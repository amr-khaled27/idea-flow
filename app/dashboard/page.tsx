"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { NavHeader } from "@/components/nav-header";
import { SendHorizontal } from "lucide-react";
import { parseIdeas } from "../gemini";
import { Idea } from "../gemini";
import { Accordion } from "@radix-ui/react-accordion";
import "@/app/styles/accordion.css";
import { handleSaveIdeaToFirestore } from "../utils/firestore";
import { useAuth } from "../providers/AuthProvider";
import { User } from "firebase/auth";
import MyAccordionItem from "@/components/MyAccordionItem";
import { BeatLoader, RingLoader } from "react-spinners";
import withAuth from "@/components/WithAuth";

function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [refresh, setRefresh] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const auth = useAuth();

  const user: User | null = auth?.user ?? null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt === "") {
      return;
    }
    setIsGenerating(true);

    const response = await fetch(
      `/.netlify/functions/prompt?prompt=${prompt}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      setIsGenerating(false);
      throw new Error("Failed to fetch ideas");
    }

    const data = await response.json();
    let ideas: Idea[] = parseIdeas(data.aiResponse);

    const retryFetchIdeas = async (retryCount: number) => {
      if (retryCount <= 0) return [];
      const response = await fetch(
        `/.netlify/functions/prompt?prompt=${prompt}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const retryText = await response.json().then((data) => data.aiResponse);
      let retryIdeas = parseIdeas(retryText);
      if (retryIdeas.length === 0) {
        retryIdeas = await retryFetchIdeas(retryCount - 1);
      }
      return retryIdeas;
    };

    if (ideas.length === 0) {
      ideas = await retryFetchIdeas(3);
    }

    setIdeas(ideas);
    setIsGenerating(false);
    setRefresh(refresh + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <NavHeader />
      <main className="container max-w-4xl mx-auto pt-24 px-4">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex gap-2">
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your idea prompt..."
              className="flex-1"
            />
            <Button
              type="submit"
              className="w-[117.5px] centered active:scale-95"
            >
              {isGenerating ? (
                <BeatLoader size={6} color="#cacaca" />
              ) : (
                <>
                  <SendHorizontal className="h-4 w-4 mr-2" /> Generate
                </>
              )}
            </Button>
          </div>

          <Card>
            <CardContent className="p-6 min-h-[400px] flex items-center justify-center text-muted-foreground">
              {isGenerating ? (
                <RingLoader size={125} color="#cacaca" />
              ) : ideas.length === 0 ? (
                "Your generated ideas will appear here"
              ) : (
                <Accordion
                  className="bg-background duration-300 w-full rounded-xl"
                  type="single"
                  collapsible
                  key={refresh}
                >
                  {ideas.map((idea, index) => (
                    <MyAccordionItem
                      refresh={refresh}
                      key={index}
                      value={index.toString()}
                      idea={idea}
                      user={user}
                      handleSaveIdeaToFirestore={handleSaveIdeaToFirestore}
                    />
                  ))}
                </Accordion>
              )}
            </CardContent>
          </Card>
        </form>
      </main>
    </div>
  );
}

export default withAuth(Dashboard);
