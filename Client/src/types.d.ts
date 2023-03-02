export interface CardProps {
  name: string;
  background_image: string;
  platforms: string[];
  price: string | number;
}

export interface GamesData extends CardProps {
  id: number;
  rating: number;
  playtime: number;
  genres: string[];
  stores: string[];
  images: string[];
  description: string;
}

