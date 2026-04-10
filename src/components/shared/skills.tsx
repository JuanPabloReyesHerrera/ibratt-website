import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

type SkillsProps = {
  skills: string[];
};

export function Skills({ skills }: SkillsProps) {
  return (
    <div className="flex flex-wrap justify-center items-center gap-6 mx-4 md:gap-10 lg:gap-10">
      {skills.map((skill) => (
        <HoverCard key={skill}>
          <HoverCardTrigger className="backdrop-blur-2xl text-foreground border-2 border-foreground rounded-full p-2 shadow-md shadow-foreground/30 hover:scale-110 transition-all">
            {skill}
          </HoverCardTrigger>
          <HoverCardContent className="backdrop-blur border border-foreground/20">
            <p className="text-muted-foreground">
              Explore our mixing and mastering services.
            </p>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
}
