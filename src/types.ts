export type CardData = {
  id: number;
  code: string;
  rating: number;
  desc: string;
  descUk?: string;
  price: number;
  imsrcOfImg: string;
}

export type CartItem = {
  id: number;
  name: string;
  price: number;
  imsrcOfImg: string;
  quantity: number;
  code: string;
  rating: number;
  desc: string;

};

