import { useNavigate } from 'react-router-dom';
import { CartItem } from '../types/CartItem';
import { useCart } from '../context/CartContext';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  const totalPrice = cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <div className="alert alert-info">Your cart is empty.</div>
      ) : (
        <ul className="list-group mb-4">
          {cart.map((item: CartItem) => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={item.bookId}>
              <div>
                <strong>{item.title}</strong><br />
                Quantity: {item.quantity || 1}<br />
                Unit Price: ${item.price.toFixed(2)}<br />
                Subtotal: ${(item.price * (item.quantity || 1)).toFixed(2)}
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.bookId)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <h4>Total: ${totalPrice.toFixed(2)}</h4>

      <div className="d-flex gap-2">
        <button className="btn btn-secondary" onClick={() => navigate("/books")}>
          Continue Browsing
        </button>
        <button className="btn btn-primary" disabled={cart.length === 0}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartPage;
