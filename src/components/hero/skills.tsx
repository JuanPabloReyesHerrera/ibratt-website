import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

type SkillsProps = {
  skills: string[];
};

export default function Skills({ skills }: SkillsProps) {
  return (
    <div className="flex flex-wrap justify-center items-center gap-6 mx-4">
      {skills.map((skill) => (
        <HoverCard key={skill}>
          <HoverCardTrigger className="text-foreground border-2 border-foreground rounded-full p-2">
            {skill}
          </HoverCardTrigger>
          <HoverCardContent>
            <p>Explore our mixing and mastering services.</p>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
}
