import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom'; // Necesario para que <Link> no rompa el test
import Cart from './Cart';

// 1. MOCKEAR EL HOOK: Engañamos a React para que no busque el Provider real
// Le decimos a Vitest que intercepte cualquier importación de 'useCart'
import * as CartContextModule from '../context/CartContext';
vi.mock('../context/CartContext', () => ({
  useCart: vi.fn(),
}));

describe('Pruebas en el componente <Cart />', () => {
  // Limpiamos los mocks antes de cada prueba para que no interfieran entre sí
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('1. Debe mostrar el mensaje de "carrito vacío" si no hay productos', () => {
    // Arrange: Preparamos el escenario (Carrito vacío)
    CartContextModule.useCart.mockReturnValue({
      cart: [],
      clearCart: vi.fn(),
    });

    // Act: Renderizamos el componente dentro de un MemoryRouter (por el <Link>)
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    // Assert: Verificamos lo que el usuario debería ver
    expect(screen.getByText('Tu carrito está vacío 😔')).toBeInTheDocument();
    expect(screen.getByText('Ir a comprar')).toBeInTheDocument();
  });

  it('2. Debe renderizar los productos y calcular el total correctamente', () => {
    // Arrange: Preparamos un carrito falso con 2 productos
    const mockCart = [
      { id: 1, title: 'Laptop Gamer', price: 1000, images: ['laptop.jpg'] },
      { id: 2, title: 'Mouse Inalámbrico', price: 50, images: ['mouse.jpg'] },
    ];

    CartContextModule.useCart.mockReturnValue({
      cart: mockCart,
      clearCart: vi.fn(),
    });

    // Act
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    // Assert: Verificamos que los productos aparezcan
    expect(screen.getByText('Laptop Gamer')).toBeInTheDocument();
    expect(screen.getByText('Mouse Inalámbrico')).toBeInTheDocument();

    // Verificamos el cálculo matemático (1000 + 50 = 1050)
    // Usamos una expresión regular (/1050/) para buscar el número dentro del H3
    expect(screen.getByText(/1050\.00/)).toBeInTheDocument();
  });

  it('3. Debe llamar a la función clearCart al hacer clic en "Vaciar Carrito"', () => {
    // Arrange: Creamos un "espía" (mock function) para ver si el botón la ejecuta
    const mockClearCart = vi.fn();

    CartContextModule.useCart.mockReturnValue({
      cart: [{ id: 1, title: 'Teclado', price: 100, images: ['teclado.jpg'] }],
      clearCart: mockClearCart, // Pasamos nuestra función espía
    });

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    // Act: Simulamos el clic del usuario
    const botonVaciar = screen.getByText('Vaciar Carrito 🗑️');
    fireEvent.click(botonVaciar);

    // Assert: Verificamos que nuestro espía haya sido llamado exactamente 1 vez
    expect(mockClearCart).toHaveBeenCalledTimes(1);
  });
});
