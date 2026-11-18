import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProducts } from '../features/products/productsSlice';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((s) => s.products);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts());
  }, [status, dispatch]);

  const filtered = items.filter((p) => p.title.toLowerCase().includes(keyword.toLowerCase()));

  return (
    <>
      <input
        className="search"
        placeholder="Tìm sản phẩm theo tên..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      {status === 'loading' && <p>Đang tải...</p>}
      {status === 'failed' && (
        <p>
          Lỗi: {error} <button onClick={() => dispatch(fetchProducts())}>Thử lại</button>
        </p>
      )}
      {status === 'succeeded' && filtered.length === 0 && <p>Không tìm thấy sản phẩm.</p>}
      <div className="grid">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}
