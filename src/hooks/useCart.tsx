import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { Product } from '../models/product';
import { api } from '../services/api';
// import { Product, Stock } from '../types';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  quantity: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, quantity }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    //ARMAZENAR ITEMS SELECIONADOS NO LOCALSTORAGE

    // const storagedCart = localStorage.getItem('@Codeby:cart')
    // if (storagedCart) {
    //   return JSON.parse(storagedCart);
    // }
    return [];
  });
  function updateLocalStorage(newCart: Product[]) {
    localStorage.setItem('@Codeby:cart', JSON.stringify(newCart));
  }

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
        toast.error('Quantidade solicitada fora de estoque');
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
      updateLocalStorage(newCart)
    } catch (error) {
      toast.error("Erro na adição do produto")
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const remainingProduct = cart.filter(product => product.id !== productId.toString())
      if (remainingProduct.length === cart.length) {
        throw new Error('Erro na remoção do produto')
      }
      setCart(remainingProduct)
      updateLocalStorage(remainingProduct)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Erro na adição do produto")
      }
    }
  };

  const updateProductAmount = async ({
    productId,
    quantity,
  }: UpdateProductAmount) => {
    try {
      if (quantity <= 0) {
        toast.error('Quantidade solicitada é inválida');
        return;
      }
      const productInCart = cart.filter(product => product.id === productId.toString());
      if (!productInCart) {
        toast.error('O produto informado não está no carrinho');
        return;
      }

      const stock = await getProductStock(productId);
      if (quantity > stock) {
        toast.error('Quantidade solicitada fora de estoque');
        return;
      } else {
        const newCart = cart.map(product => {
          if (product.id === productId.toString()) {
            product.quantity = quantity;
          }
          return product;
        })
        setCart(newCart)
        updateLocalStorage(newCart)
      }
    } catch {
      toast.error("Erro na alteração de quantidade do produto")
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
