import React, { createContext, useState, ReactNode, useContext } from 'react';
import Toast from 'react-native-toast-message'; 

type Product = {
  id: string;
  name: string;
  price: number; 
  quantity: number;
};

type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      
      if (existingProduct) {
        const updatedCart = prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        Toast.show({
          type: 'success',
          position: 'top',
          text1: `${product.name} Adicionado!`,
          text2: `Quantidade: ${existingProduct.quantity + 1}`,
        });

        return updatedCart;
      } else {
        const updatedCart = [...prevCart, { ...product, quantity: 1 }];

        Toast.show({
          type: 'success',
          position: 'top',
          text1: `${product.name} Adicionado!`,
          text2: `Quantidade: 1`,
        });

        return updatedCart;
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === id);
      
      if (existingProduct && existingProduct.quantity > 1) {
        return prevCart.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevCart.filter((product) => product.id !== id);
      }
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
