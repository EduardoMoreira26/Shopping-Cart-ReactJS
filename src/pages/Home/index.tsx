import { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { ProductList } from './styles';
import { api } from '../../services/api';
import { formatPrice } from '../../util/format';
import { useCart } from '../../hooks/useCart';
import { Product } from '../../models/product';

interface ProductFormatted extends Product {
  priceFormatted: string;
}

interface CartItemsAmount {
  [key: number]: number;
}

const Home = (): JSX.Element => {
  const [products, setProducts] = useState<ProductFormatted[]>([]);
  const { addProduct, cart } = useCart();

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    sumAmount[Number(product.id)] = product.quantity;
    return sumAmount;
  }, {} as CartItemsAmount)

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get<Product[]>('/items');
      const receivedProducts = response.data;
      const formattedProducts = receivedProducts.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price)
      } as ProductFormatted))

      setProducts(formattedProducts)
    }

    loadProducts();
  }, []);

  async function handleAddProduct(id: number) {
    await addProduct(id);
  }

  return (
    <ProductList>
      {products.map(product => (
        <li key={product.id}>
          <img src={product.imageUrl} alt={product.name} />
          <strong>{product.name}</strong>
          <span>{product.priceFormatted}</span>
          <button
            type="button"
            data-testid="add-product-button"
            onClick={() => handleAddProduct(Number(product.id))}
          >
            <div data-testid="cart-product-quantity">
              <MdAddShoppingCart size={16} color="#FFF" />
              {cartItemsAmount[Number(product.id)] || 0}
            </div>
            <span>Adicionar no carrinho</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
};

export default Home;
