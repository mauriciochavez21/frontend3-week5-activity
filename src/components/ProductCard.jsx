import { Link } from 'react-router-dom';

// Recibe la prop 'product' (Desestructuración)
const ProductCard = ({ product }) => {
  return (
    // Template Literals para inyectar el ID real en la URL (ej. /product/5)
    <Link to={`/product/${product.id}`} className="product-card">
      <img
        src={product.images[0]}
        alt={product.title}
        className="product-image"
      />
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        {/* Inyectamos el precio formateado con el símbolo de dólares */}
        <p className="product-price">${product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
