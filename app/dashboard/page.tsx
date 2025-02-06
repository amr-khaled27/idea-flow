"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { NavHeader } from "@/components/nav-header";
import { SendHorizontal } from "lucide-react";
import { promptAI, parseIdeas } from "../gemini";
import { Idea } from "../gemini";
import { Accordion } from "@radix-ui/react-accordion";
import "@/app/styles/accordion.css";
import { handleSaveIdeaToFirestore } from "../utils/firestore";
import { useAuth } from "../providers/AuthProvider";
import { User } from "firebase/auth";
import MyAccordionItem from "@/components/MyAccordionItem";

export default function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [refresh, setRefresh] = useState<number>(0);

  const auth = useAuth();

  const user: User | null = auth?.user ?? null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Generating ideas for prompt:", prompt);
    const text = (await promptAI(prompt)).response.text();
    const ideas: Idea[] = parseIdeas(text);
    console.log(text, ideas);
    setIdeas(ideas);
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
            <Button type="submit">
              <SendHorizontal className="h-4 w-4 mr-2" />
              Generate
            </Button>
          </div>

          <Card>
            <CardContent className="p-6 min-h-[400px] flex items-center justify-center text-muted-foreground">
              {ideas.length === 0 ? (
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
