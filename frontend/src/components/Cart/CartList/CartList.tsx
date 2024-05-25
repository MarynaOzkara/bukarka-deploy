// type CartItem = {
//   _id: string;
//   name: string;
//   price: number;
//   quantity: number;
// };

import CartItem from "../CartItem";

type CartListProps = {
  cartData: any;
};

const CartList: React.FC<CartListProps> = ({ cartData }) => {
  console.log(cartData.orderItems);

  return (
    <div>
      {cartData.orderItems.map((item: any) => (
        <CartItem item={item}/>
      ))}
    </div>
  );
};

export default CartList;
