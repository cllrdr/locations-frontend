import { type FC } from "react";

const CART_ICON_PATH = "http://localhost:9000/locations/cart.png"; 

export const FloatingCart: FC = () => {
  return (
    <div className="favorites-float disabled">
      <img src={CART_ICON_PATH} alt="Корзина" />
      <div className="cart-count">0</div>
    </div>
  );
};

export default FloatingCart;