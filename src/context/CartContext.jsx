/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from 'react';

// 1. Creamos el contexto pero NO lo exportamos (se vuelve privado)
const CartContext = createContext();

// 2. Exportamos el Proveedor (El componente que envuelve a la app)
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    alert('¡Producto agregado al carrito!');
    setCart([...cart, product]);
  };

  const clearCart = () => {
    alert('¡Carrito vaciado!');
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// 3. Creamos y exportamos un Custom Hook para consumir el contexto
export const useCart = () => {
  const context = useContext(CartContext);

  // Buena práctica: Prevenir errores si intentan usar el carrito fuera del proveedor
  if (context === undefined) {
    throw new Error('useCart debe ser utilizado dentro de un CartProvider');
  }

  return context;
};
