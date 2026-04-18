import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

const Catalog = () => {
  // 1. ESTADO: La memoria a corto plazo del componente
  const [products, setProducts] = useState([]); // Inicia vacío
  const [isLoading, setIsLoading] = useState(true); // Inicia cargando
  const [error, setError] = useState(null);

  // 2. EFECTO: Se ejecuta cuando el componente "nace" (aparece en pantalla)
  useEffect(() => {
    // Declaramos la función asíncrona por dentro
    const fetchProducts = async () => {
      try {
        // Pausamos la ejecución hasta que FakeStore responda
        const response = await fetch(
          'https://api.escuelajs.co/api/v1/products'
        );

        // Si el servidor manda un error (ej. 404), lanzamos la excepción
        if (!response.ok) throw new Error('Error al conectar con la tienda');

        // Convertimos el texto a un arreglo de objetos JavaScript
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message); // Guardamos el texto del error
      } finally {
        setIsLoading(false); // Siempre quitamos el loader al terminar
      }
    };

    fetchProducts();
  }, []); // 🚨 EL ARREGLO VACÍO: Significa "Ejecútate solo UNA vez".

  // 3. RENDERIZADO CONDICIONAL (Escudos protectores)
  if (isLoading)
    return <h2 className="state-message">Cargando catálogo... ⏳</h2>;
  if (error)
    return <h2 className="state-message error-text">Error: {error} ❌</h2>;

  // 4. RENDERIZADO PRINCIPAL
  return (
    <div className="container">
      <h2 className="title">Nuestros Productos</h2>
      <div className="products-grid">
        {/* .map() es el ciclo For de React. Dibuja una tarjeta por cada producto */}
        {products.map((product) => (
          // key={product.id} es obligatorio para que React sepa quién es quién
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
