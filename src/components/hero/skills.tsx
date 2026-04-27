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
    <div className="flex flex-wrap justify-center items-center gap-6 mx-4 md:gap-10">
      {skills.map((skill) => (
        <HoverCard key={skill}>
          <HoverCardTrigger className="backdrop-blur-2xl text-foreground text-sm sm:text-xl border border-foreground/80 rounded-full p-2 shadow-md shadow-foreground/20 hover:scale-110 active:scale-90 transition-all">
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
