export interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: string;
  playtime: number;
  price: string;
  description: string;
  images: string[];
  platforms: string[];
  genres: string[];
  stores: string[];
  released: string;
  state: boolean
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
    image: string;
    stars: number;
  }

export interface User {
    email: string,
		admin: boolean,
		blocked: boolean,
		secret: string,
    image: string
  }

export interface Friend {
  emailUser: string,
  emailFriend: string,
  response: string
}