export type Idea = {
  id: string;
  text: string;
  description: string;
  plan?: Plan;
};

export type Plan = {
  actionSteps: string[];
};

function parsePlan(response: string): Plan {
  const lines = response.split("\n").filter((line) => line.trim() !== "");
  const actionSteps = lines.map((line) => line.trim());

  return { actionSteps };
}

function parseIdeas(response: string): Idea[] {
  const ideas: Idea[] = [];
  const lines = response.split("\n").filter((line) => line.trim() !== "");

  for (let i = 0; i < lines.length; i++) {
    if (lines[i] && lines[i + 1] && lines[i + 1].startsWith("- ")) {
      ideas.push({
        id: crypto.randomUUID(),
        text: lines[i].trim(),
        description: lines[i + 1].replace(/^- /, "").trim(),
      });
      i++;
    }
  }

  return ideas;
}

export { parseIdeas, parsePlan };
