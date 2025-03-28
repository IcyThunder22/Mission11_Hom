import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { CartItem } from "../types/CartItem";

function PurchasePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookId } = useParams();
  const { addToCart } = useCart();
  const [amount, setAmount] = useState<number>(1);

  // Get state from location or sessionStorage
  const saved = sessionStorage.getItem("purchase");
  const rawState = location.state || (saved && JSON.parse(saved));
  const title = rawState?.title;
  const price = Number(rawState?.price); // Convert in one clean step

  // Handle missing data
  if (!title || isNaN(price)) {
    return (
      <div className="container mt-5">
        <h2>Book data not available</h2>
        <p>You may have refreshed the page or navigated directly.</p>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Return to Book List
        </button>
      </div>
    );
  }

  // Add to cart
  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookId: Number(bookId),
      title,
      price,
      quantity: amount,
    };
    addToCart(newItem);
    sessionStorage.removeItem("purchase"); // optional: clear it out
    navigate("/cart");
  };

  return (
    <div className="container mt-5">
      <h2>
        Add <strong>{title}</strong> to your cart – ${price.toFixed(2)}
      </h2>

      <div>
        <input
          type="number"
          min={1}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>

      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}

export default PurchasePage;
