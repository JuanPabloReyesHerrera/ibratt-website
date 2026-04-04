interface iconProps {
  name: string;
  size?: number;
  className?: string;
}

export const Icon = ({ name, size, className = "" }: iconProps) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={`inline-block fill-current ${className} size-${size || 5}`}
    >
      <use href={`/assets/sprite.svg#${name}`} />
    </svg>
  );
};
