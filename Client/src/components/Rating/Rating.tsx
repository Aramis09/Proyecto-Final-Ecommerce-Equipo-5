import { useState } from "react";

interface Props {
  value: number;
  size?: number;
}

export function Rating({ value, size = 24 }: Props) {
  const fullStars = Math.floor(value);
  const halfStars = Math.round((value - fullStars) * 2);

  const stars = Array.from({ length: fullStars }, (_, index) => (
    <Star key={`full-${index}`} filled={true} size={size} />
  )).concat(
    Array.from({ length: halfStars }, (_, index) => (
      <Star key={`half-${index}`} filled={false} size={size} />
    ))
  );

  return <div>{stars}</div>;
}

interface StarProps {
  filled: boolean;
  size: number;
}

function Star({ filled, size }: StarProps) {
  const [color, setColor] = useState(filled ? "#FFD700" : "#C4C4C4");

  const handleMouseEnter = () => setColor("#FFD700");
  const handleMouseLeave = () => setColor(filled ? "#FFD700" : "#C4C4C4");

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 17.27l-5.66 3.41L7 15.12 2.34 11.86l6.66-.96L12 5l2.99 5.9 6.66.96-4.66 3.26 1.66 5.75L12 17.27z" />
    </svg>
  );
}
