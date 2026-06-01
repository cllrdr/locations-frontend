import { type FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes";
import { MOCK_TOKEN } from "../modules/mock";

const CART_ICON_PATH = "http://localhost:9000/locations/cart.png";

export const FloatingCart: FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/games/cart", {
        headers: {
          Authorization: `Bearer ${MOCK_TOKEN}`,
        },
        signal: AbortSignal.timeout(5000),
      });

      if (response.status === 200) {
        navigate(ROUTES.LOCATIONS);
      }
    } catch {
      // Silent fail - don't navigate on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="favorites-float active"
      onClick={handleClick}
      style={{ cursor: loading ? "wait" : "pointer", opacity: loading ? 0.6 : 1 }}
    >
      <img src={CART_ICON_PATH} alt="Корзина" />
      <div className="cart-count">0</div>
    </div>
  );
};

export default FloatingCart;