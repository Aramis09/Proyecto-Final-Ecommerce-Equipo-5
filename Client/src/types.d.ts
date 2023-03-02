export interface CardProps {
  name: string;
  background_image: string;
  platforms: string[];
  price: string | number;
}

export interface CardProps2 extends CardProps {
  description: string;
  image: string[]
}
