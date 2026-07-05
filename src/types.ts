export type CardData = {
  id: number;
  code: string;
  rating: number;
  desc: string;
  descUk?: string;
  price: number;
  imgSrc: string;
}

export type CartItem = {
  id: number;
  name: string;
  price: number;
  imgSrc: string;
  quantity: number;
  code: string;
  rating: number;
  desc: string;

};

