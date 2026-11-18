import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  removeFromCart,
  selectCartItems,
  selectCartTotal,
  updateQuantity,
} from '../features/cart/cartSlice';

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);

  if (items.length === 0) return <p>Giỏ hàng trống. <Link to="/">Mua sắm ngay</Link></p>;

  return (
    <>
      <h2>Giỏ hàng</h2>
      {items.map((i) => (
        <div key={i.id} className="cart-row">
          <img src={i.image} alt={i.title} width={60} />
          <span className="clamp">{i.title}</span>
          <span>${i.price.toFixed(2)}</span>
          <input
            type="number"
            min={1}
            value={i.quantity}
            onChange={(e) =>
              dispatch(updateQuantity({ id: i.id, quantity: Number(e.target.value) }))
            }
          />
          <button onClick={() => dispatch(removeFromCart(i.id))}>Xoá</button>
        </div>
      ))}
      <h3>Tổng: ${total.toFixed(2)}</h3>
      <Link to="/checkout"><button>Thanh toán</button></Link>
    </>
  );
}
