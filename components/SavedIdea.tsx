"use client";
import { Idea } from "@/app/gemini";
import { handleDeleteIdea, fetchIdeas } from "@/app/utils/firestore";
import { User } from "firebase/auth";
import { TrashIcon, PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import EditIdea from "@/components/EditIdea";

type SavedIdeaProps = {
  idea: Idea;
  user: User | null | undefined;
  setIdeas: React.Dispatch<React.SetStateAction<Idea[]>>;
};

const SavedIdea = ({ idea, user, setIdeas }: SavedIdeaProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);

  return (
    <div className="mb-4 w-full p-4 flex justify-between border rounded-lg shadow-sm">
      {editing && (
        <>
          <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black/50"></div>
          <EditIdea
            idea={idea}
            user={user}
            setEditing={setEditing}
            setIdeas={setIdeas}
          />
        </>
      )}
      <div>
        <h2 className="text-xl font-bold text-primary">{idea.text}</h2>
        <p className="mt-2">{idea.description}</p>
      </div>
      <div className="flex flex-col">
        <Button
          onClick={async () => {
            setLoading(true);
            await handleDeleteIdea(idea, user);
            const updatedIdeas = await fetchIdeas(user);
            setLoading(false);
            setIdeas(updatedIdeas);
          }}
          variant="ghost"
        >
          {loading ? (
            <BeatLoader size={4} color="#cacaca" />
          ) : (
            <TrashIcon className="h-5 w-5 text-red-500" />
          )}
        </Button>
        <Button
          onClick={() => {
            setEditing(true);
          }}
          variant="ghost"
        >
          <PencilIcon className="h-5 w-5 text-blue-500" />
        </Button>
      </div>
    </div>
  );
};

export default SavedIdea;
