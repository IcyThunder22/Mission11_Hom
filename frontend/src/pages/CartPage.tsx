import { useNavigate } from 'react-router-dom';
import { CartItem } from '../types/CartItem';
import { useCart } from '../context/CartContext';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  return (
    <div>
      <h2>Your cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item: CartItem) => (
            <li key={item.bookId}>
              {item.title}: ${item.price.toFixed(2)}
              <button onClick={() => removeFromCart(item.bookId)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <h3>Total :</h3>
      <button onClick={() => navigate('/books')}>
        Continue Browsing
      </button>{' '}
      <button>Checkout</button>
    </div>
  );
}

export default CartPage;
