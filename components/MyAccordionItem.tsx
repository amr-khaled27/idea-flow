"use client";
import { useEffect, useState } from "react";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import "@/app/styles/accordion.css";
import { Idea } from "@/app/gemini";
import { BeatLoader } from "react-spinners";

interface MyAccordionItemProps {
  refresh: number;
  value: string;
  idea: Idea;
  user: any;
  handleSaveIdeaToFirestore: (idea: any, user: any) => Promise<void>;
}

const MyAccordionItem = ({
  refresh,
  value,
  idea,
  user,
  handleSaveIdeaToFirestore,
}: MyAccordionItemProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  useEffect(() => {}, [refresh]);

  return (
    <AccordionItem
      key={value}
      value={`item-${value}`}
      className="AccordionItem flex w-full flex-col duration-300 justify-between p-4"
    >
      <div className="flex items-center">
        <AccordionTrigger className="AccordionTrigger flex-grow text-lg text-start font-medium flex duration-300 text-primary justify-between items-center cursor-pointer">
          {idea.text}
          <ChevronDownIcon className="text-lg AccordionChevron" aria-hidden />
        </AccordionTrigger>

        <Button
          className="ml-4 block w-[120px] disabled:w-[120px] centered text-muted-foreground"
          disabled={saved}
          type="button"
          variant="ghost"
          onClick={async (e) => {
            e.stopPropagation();
            setLoading(true);
            await handleSaveIdeaToFirestore(idea, user);
            setLoading(false);
            setSaved(true);
          }}
        >
          {loading ? (
            <BeatLoader size={8} color="#cacaca" />
          ) : saved ? (
            "Saved!"
          ) : (
            "Save for later"
          )}
        </Button>
      </div>
      <AccordionContent className="AccordionContent">
        {idea.description}
      </AccordionContent>
    </AccordionItem>
  );
};

export default MyAccordionItem;
