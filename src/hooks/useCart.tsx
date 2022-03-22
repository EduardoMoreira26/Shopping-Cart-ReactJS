import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { Product } from '../models/product';
import { api } from '../services/api';
interface CartProviderProps {
  children: ReactNode;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>([]);

  async function getProductStock(productId: number) {
    const stockResponse = await api.get(`/items/${productId}`)
    const { quantity: stock } = stockResponse.data;
    return stock || 0;
  }

  const addProduct = async (productId: number) => {
    try {
      const stock = await getProductStock(productId);
      const newCart = [...cart];
      const alreadyExists = newCart.find(product => product.id === productId.toString());
      const quantity = (alreadyExists ? alreadyExists.quantity : 0) + 1;

      if (quantity > stock) {
        toast.error('Sem estoque!');
        return;
      }

      if (alreadyExists) {
        alreadyExists.quantity = quantity;
      } else {
        const product = await api.get<Product>(`/items/${productId}`)
        const newProduct = {
          ...product.data,
          quantity
        }
        newCart.push(newProduct)
      }
      setCart(newCart)
    } catch (error) {
      toast.error("Erro na adição do produto")
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);
  return context;
}
