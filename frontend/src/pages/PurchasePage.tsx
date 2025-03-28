import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { CartItem } from "../types/CartItem";

function Purchase() {
  const navigate = useNavigate();
  const location = useLocation();
  const { title, price } = location.state || {};
  const { bookId } = useParams();
  const { addToCart } = useCart();
  const [amount, setAmount] = useState<number>(1);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookId: Number(bookId),
      title: title || "Unknown Book",
      price: price || 0,
      quantity: amount,
    };
    addToCart(newItem);
    navigate("/cart");
  };

  return (
    <>
      <h2>
        Add <strong>{title}</strong> to your cart – ${price?.toFixed(2)}
      </h2>

      <div>
        <input
          type="number"
          min={1}
          placeholder="Enter quantity"
          value={amount}
          onChange={(x) => setAmount(Number(x.target.value))}
        />
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>

      <button onClick={() => navigate(-1)}>Go Back</button>
    </>
  );
}

export default Purchase;
