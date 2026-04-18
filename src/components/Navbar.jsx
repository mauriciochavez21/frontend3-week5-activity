import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        🛒 TechStore
      </Link>

      <div className="nav-links">
        {/* NUNCA usamos <a> en React. <Link> intercepta el clic y cambia
            la URL silenciosamente, evitando que el navegador se reinicie */}
        <Link to="/" className="nav-link">
          Catálogo
        </Link>
        <Link to="/cart" className="nav-link">
          Mi Carrito
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
