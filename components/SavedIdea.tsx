"use client";
import { Idea, parsePlan, Plan } from "@/app/gemini";
import { handleDeleteIdea, fetchIdeas } from "@/app/utils/firestore";
import { User } from "firebase/auth";
import { TrashIcon, PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import EditIdea from "@/components/EditIdea";
import { AnimatePresence, motion } from "motion/react";

type SavedIdeaProps = {
  idea: Idea;
  user: User | null | undefined;
  setIdeas: React.Dispatch<React.SetStateAction<Idea[]>>;
};

const SavedIdea = ({ idea, user, setIdeas }: SavedIdeaProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [plan, setPlan] = useState<Plan | null>(null);

  const handleTurnIntoPlan = async (idea: Idea) => {
    const fetchPlan = async (retryCount: number): Promise<Plan> => {
      console.log("fetching plan");
      if (retryCount <= 0) return { actionSteps: [] };
      const response = await fetch(
        `/.netlify/functions/plan?prompt=${idea.text}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const text = await response.json().then((data) => data.aiResponse);
      let plan = parsePlan(text);
      if (plan.actionSteps.length === 0) {
        return fetchPlan(retryCount - 1);
      }
      return plan;
    };

    const plan = await fetchPlan(3);

    setPlan(plan);
  };

  const variants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  return (
    <div className="mb-4 w-full p-4 flex justify-between border rounded-lg shadow-sm">
      <AnimatePresence>
        {editing && (
          <>
            <motion.div
              variants={variants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: 0.3, type: "tween", ease: "easeInOut" }}
              className="fixed top-0 left-0 w-screen h-screen z-10 bg-black/50"
            ></motion.div>
            <EditIdea
              idea={idea}
              user={user}
              setEditing={setEditing}
              setIdeas={setIdeas}
            />
          </>
        )}
      </AnimatePresence>
      <div>
        <h2 className="text-xl font-bold text-primary">{idea.text}</h2>
        <p className="mt-2">{idea.description}</p>

        <Button className="mt-4" onClick={() => handleTurnIntoPlan(idea)}>
          Turn Into Plan
        </Button>

        <div>
          {plan && (
            <div>
              <h3 className="text-lg font-bold text-primary mt-4">
                Suggested Plan
              </h3>
              <ul>
                {plan.actionSteps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1">
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
