import React, { useState } from "react";
import { Idea } from "@/app/gemini";
import { User } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { handleEditIdea, fetchIdeas } from "@/app/utils/firestore";
import { BeatLoader } from "react-spinners";
import { motion } from "motion/react";

type EditIdeaProps = {
  idea: Idea;
  user: User | null | undefined;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setIdeas: React.Dispatch<React.SetStateAction<Idea[]>>;
};

const EditIdea = ({ idea, user, setEditing, setIdeas }: EditIdeaProps) => {
  const [saving, setSaving] = useState<boolean>(false);
  const [ideaText, setIdeaText] = useState<string>(idea.text);
  const [ideaDescription, setIdeaDescription] = useState<string>(
    idea.description
  );

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleEditIdea(idea, user, ideaText, ideaDescription);
    const ideas: Idea[] = await fetchIdeas(user);
    setSaving(false);
    setIdeas(ideas);
  };

  const variants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  return (
    <motion.div
      variants={variants}
      initial="closed"
      animate="open"
      exit="closed"
      transition={{ duration: 0.3, type: "tween", ease: "easeInOut" }}
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card p-6 rounded-lg shadow-lg z-50"
    >
      <h2 className="text-lg font-bold">Edit Idea</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Make changes to your idea here. Click save when you&apos;re done.
      </p>
      <form className="mt-4" onSubmit={handleSave}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-foreground">
            Idea Title
          </label>
          <input
            type="text"
            className="mt-1 block w-full p-2 mb-4 border border-border bg-card rounded-md"
            value={ideaText}
            onChange={(e) => setIdeaText(e.target.value)}
          />

          <label className="block text-sm font-medium text-foreground">
            Idea Description
          </label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-border bg-card rounded-md"
            value={ideaDescription}
            onChange={(e) => setIdeaDescription(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <Button
            type="button"
            variant="ghost"
            className="btn btn-secondary mr-2"
            onClick={() => {
              setEditing(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setSaving(true);
            }}
            type="submit"
            variant="ghost"
            className="btn btn-primary"
          >
            {saving ? <BeatLoader size={6} color="#cacaca" /> : "Save"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default EditIdea;
