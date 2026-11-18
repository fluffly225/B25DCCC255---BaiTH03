import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { clearCart, selectCartItems, selectCartTotal } from '../features/cart/cartSlice';

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const [ordered, setOrdered] = useState(false);

  const handleOrder = () => {
    dispatch(clearCart());
    setOrdered(true);
  };

  if (ordered) {
    return <p className="success">🎉 Đặt hàng thành công! <Link to="/">Tiếp tục mua sắm</Link></p>;
  }
  if (items.length === 0) return <p>Giỏ hàng trống. <Link to="/">Về trang chủ</Link></p>;

  return (
    <>
      <h2>Thanh toán</h2>
      {items.map((i) => (
        <p key={i.id}>{i.title} × {i.quantity} — ${(i.price * i.quantity).toFixed(2)}</p>
      ))}
      <h3>Tổng: ${total.toFixed(2)}</h3>
      <button onClick={handleOrder}>Đặt hàng</button>
    </>
  );
}
