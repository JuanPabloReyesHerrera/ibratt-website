type GradientBackgroundProps = {
  to: "b" | "bl" | "br" | "t" | "tl" | "tr";
  from?: string;
  via?: string;
  toColor?: string;
  //"10" | "20" | "30" | "40" | "50" | "60" | "70" | "80" | "90";
};

export function GradientBackground({
  to,
  from = "transparent",
  via,
  toColor,
}: GradientBackgroundProps) {
  return (
    <div
      className={`absolute w-full h-full bg-linear-to-${to} from-${from} from-10% via-${via} via-40% to-${toColor}`}
    />
  );
}
