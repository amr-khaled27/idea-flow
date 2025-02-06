"use client";
import React, { useEffect, useState } from "react";
import { NavHeader } from "@/components/nav-header";
import { useAuth } from "@/app/providers/AuthProvider";
import { fetchIdeas } from "@/app/utils/firestore";
import SavedIdea from "@/components/SavedIdea";

const IdeasPage: React.FC = () => {
  const [ideas, setIdeas] = useState<any[]>([]);

  const auth = useAuth();
  const user = auth?.user;

  useEffect(() => {
    const fetchData = async () => {
      const ideas = await fetchIdeas(user);
      setIdeas(ideas);
    };
    fetchData();
  }, [user]);

  return (
    <>
      <NavHeader />
      <div className="p-4">
        <div className="mt-32">
          {ideas.length === 0 ? (
            <p>No ideas were found</p>
          ) : (
            ideas.map((idea, index) => (
              <SavedIdea
                key={index}
                idea={idea}
                setIdeas={setIdeas}
                user={user}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default IdeasPage;
