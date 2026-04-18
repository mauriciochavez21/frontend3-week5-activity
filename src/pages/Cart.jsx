import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Solo importamos el Custom Hook

const Cart = () => {
  // 1. Extraemos el carrito y la función usando el Hook (¡sin parámetros!)
  const { cart, clearCart } = useCart();

  // 2. LÓGICA DE NEGOCIO: Calculamos el total usando .reduce()
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  // 3. RENDERIZADO CONDICIONAL: Si el carrito está vacío
  if (cart.length === 0) {
    return (
      <div className="container empty-cart">
        <h2>Tu carrito está vacío 😔</h2>
        <Link to="/" className="back-link">
          Ir a comprar
        </Link>
      </div>
    );
  }

  // 4. RENDERIZADO PRINCIPAL: Si hay productos
  return (
    <div className="container">
      <h2 className="title">Resumen de tu Compra</h2>

      <div className="cart-list">
        {/* Iteramos sobre el carrito para mostrar cada producto */}
        {cart.map((item, index) => (
          <div key={index} className="cart-item">
            <img
              src={item.images[0]}
              alt={item.title}
              className="cart-item-image"
            />
            <div className="cart-item-info">
              <h4>{item.title}</h4>
              <p>${item.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Sección Financiera */}
      <div className="cart-summary">
        <h3>Total a Pagar: ${total.toFixed(2)}</h3>

        <div className="cart-actions">
          <button className="clear-btn" onClick={clearCart}>
            Vaciar Carrito 🗑️
          </button>
          <button
            className="checkout-btn"
            onClick={() => alert('¡Compra simulada exitosa!')}
          >
            Pagar Ahora 💳
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
