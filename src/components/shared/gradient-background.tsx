type GradientBackgroundProps = {
  to: "b" | "bl" | "br" | "t" | "tl" | "tr";
  from?: string;
  fromVia?: string;
  via?: string;
  toColor?: string;
  //"10" | "20" | "30" | "40" | "50" | "60" | "70" | "80" | "90";
};

export function GradientBackground({
  to,
  from = "transparent",
  fromVia = "from-10%",
  via,
  toColor,
}: GradientBackgroundProps) {
  const DIRECTIONS = {
    b: "bg-linear-to-b",
    bl: "bg-linear-to-bl",
    br: "bg-linear-to-br",
    t: "bg-linear-to-t",
    tl: "bg-linear-to-tl",
    tr: "bg-linear-to-tr",
  };

  return (
    <div
      className={`absolute w-full h-full ${DIRECTIONS[to]} ${from} ${fromVia} ${via} via-40% ${toColor}`}
    />
  );
}
