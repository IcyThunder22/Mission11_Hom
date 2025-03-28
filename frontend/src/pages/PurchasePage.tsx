import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { CartItem } from '../types/CartItem';

function Purchase() {
  const navigate = useNavigate();
  const { title, bookId } = useParams();
  const { addToCart } = useCart();
  const [amount, setAmount] = useState<number>(0);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookId: Number(bookId),
      title: title || 'Unknown Book',
      price: amount,
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <h2>Add {title} to your cart</h2>

      <div>
        <input
          type="number"
          placeholder="Enter amount"
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
