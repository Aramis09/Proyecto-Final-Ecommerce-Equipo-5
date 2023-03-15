export interface Game {
  id: string | number;
  name: string;
  background_image: string;
  rating: number;
  playtime: number;
  price: string | number;
  description: string;
  images: string[];
  platforms: string[];
  genres: string[];
  stores: string[];
}

export interface CardProps {
  id: string | number;
  name: string;
  background_image: string;
  platforms: string[];
  price: string | number;
}

export interface CardProps2 extends CardProps {
  description: string;
  image: string[];
}

export interface Comment {
    id: number;
    userId: string;
    productId: number;
    comment: string;
    date: string;
  }
