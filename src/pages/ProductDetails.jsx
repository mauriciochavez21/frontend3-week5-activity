import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Importamos el cerebro global

const ProductDetails = () => {
  // 1. EL PARÁMETRO: Atrapamos el ID de la URL (ej. /product/5)
  const { id } = useParams();

  // 2. EL ESTADO LOCAL
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 3. EL ESTADO GLOBAL: Extraemos la función para agregar al carrito
  const { addToCart } = useCart();

  // 4. EL EFECTO: Descargamos solo este producto
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Inyectamos el ID dinámico en la URL de la API
        const response = await fetch(
          `https://api.escuelajs.co/api/v1/products/${id}`
        );
        if (!response.ok) throw new Error('Producto no encontrado');

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // 🚨 Dependencia: Si el ID cambia, vuelve a ejecutar el fetch

  // 5. RENDEREOS CONDICIONALES
  if (isLoading)
    return <h2 className="state-message">Cargando detalles... ⏳</h2>;
  if (error) return <h2 className="state-message error-text">{error} ❌</h2>;

  // 6. RENDERIZADO PRINCIPAL
  return (
    <div className="container details-container">
      <Link to="/" className="back-link">
        ⬅ Volver al catálogo
      </Link>

      <div className="product-layout">
        <img
          src={product.images[0]}
          alt={product.title}
          className="details-image"
        />

        <div className="details-info">
          <h2>{product.title}</h2>
          <p className="category-badge">{product.category.name}</p>
          <p className="description">{product.description}</p>
          <h3 className="price">${product.price}</h3>

          {/* Al hacer clic, enviamos el objeto 'product' completo al Contexto */}
          <button
            className="add-to-cart-btn"
            onClick={() => addToCart(product)}
          >
            Añadir al Carrito 🛒
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
