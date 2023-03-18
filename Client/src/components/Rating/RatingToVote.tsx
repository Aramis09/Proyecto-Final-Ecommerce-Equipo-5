import { useState } from "react";

interface Props {
  size?: number;
}

export function RatingToVote({size = 24 }: Props) {
  const fullStars = 5;

  const [stars, setStars] = useState(Array(fullStars).fill(false));

  const handleStarClick = (index: number) => {
    const newStars = stars.map((_, i) => i <= index);
    setStars(newStars);
  };

  return (
    <div className="star-container">
      {stars.map((filled, index) => (
        <Star
          key={`full-${index}`}
          filled={filled}
          size={size}
          onClick={() => handleStarClick(index)}
        />
      ))}
    </div>
  );
}

interface StarProps {
  filled: boolean;
  size: number;
  onClick?: () => void;
}

function Star({ filled, size, onClick }: StarProps) {
  const color = filled ? "#FFD700" : "#D3D3D3";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      onClick={onClick}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 17.27l-5.66 3.41L7 15.12 2.34 11.86l6.66-.96L12 5l2.99 5.9 6.66.96-4.66 3.26 1.66 5.75L12 17.27z" />
    </svg>
  );
}
