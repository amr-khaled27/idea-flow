"use client";
import React, { useEffect, useState } from "react";
import { NavHeader } from "@/components/nav-header";
import { useAuth } from "@/app/providers/AuthProvider";
import SavedIdea from "@/components/SavedIdea";
import { MoonLoader } from "react-spinners";

const IdeasPage: React.FC = () => {
  const [ideas, setIdeas] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const auth = useAuth();
  const user = auth?.user;

  useEffect(() => {
    const fetchData = async () => {
      setIdeas(ideas);
      setLoading(false);
      setIdeas(ideas);
    };
    fetchData();
  }, [user, ideas]);

  return (
    <>
      <NavHeader />
      {loading ? (
        <div className="h-screen w-screen centered">
          <MoonLoader color="#cacaca" size={32} />
        </div>
      ) : (
        <div className="pt-32 mx-4">
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
      )}
    </>
  );
};

export default IdeasPage;
