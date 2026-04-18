import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Catalog from './pages/Catalog';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';

function App() {
  return (
    <div>
      {/* El Navbar está FUERA de Routes para que se quede fijo siempre */}
      <Navbar />

      {/* Routes funciona como un Switch/Case. Lee la URL y muestra 1 vista */}
      <Routes>
        <Route path="/" element={<Catalog />} />
        {/* Usamos :id para crear una ruta dinámica que atrape el ID del producto */}
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
