import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProducts } from '../features/products/productsSlice';
import { addToCart } from '../features/cart/cartSlice';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((s) => s.products);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts());
  }, [status, dispatch]);

  const product = items.find((p) => p.id === Number(id));

  if (status === 'idle' || status === 'loading') return <p>Đang tải...</p>;
  if (!product) return <p>Không tìm thấy sản phẩm. <Link to="/">Về trang chủ</Link></p>;

  return (
    <div className="detail">
      <img src={product.image} alt={product.title} />
      <div>
        <h2>{product.title}</h2>
        <p><em>{product.category}</em></p>
        <p className="price">${product.price.toFixed(2)}</p>
        <p>{product.description}</p>
        <button onClick={() => dispatch(addToCart(product))}>Thêm vào giỏ</button>
      </div>
    </div>
  );
}
