export interface IProduct {
  id: string;
  title: string;
  author: string;
  image: string | null;
  price: number;
  // rating: number;
  index: number;
}

export interface IOrderItems {
  _id: string;
  quantity: number;
  product: IProduct;
  createdAt: string;
  updatedAt: string;
}

export interface IOrders {
  _id: string;
  orderItems: IOrderItems[];
  status: string;
  totalPrice: number;
}

export interface UpdatedOrderPayload {
  id?: string;
  customerInfo: {
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
    city: string;
    address: string;
    payment: string;
    comment: string;
  };
}
