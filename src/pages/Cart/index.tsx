import { toast } from 'react-toastify';
import { useCart } from '../../hooks/useCart';
import { Product } from '../../models/product';
import { formatPrice } from '../../util/format';
import { Container, Image, ProductTable, Total, Title, Footer, FreeShipping, ContentButton } from './styles';

const minimumAmountForFreeShipping = 10; //VALOR MINIMO PARA APLICA FRETE GRÀTIS
interface CartFormatted extends Product {
  priceFormatted: string;
  totalFormatted: string;
}

const Cart = (): JSX.Element => {
  const { cart } = useCart();

  const cartFormatted = cart.map(product => ({
    ...product,
    priceFormatted: formatPrice(product.price),
    totalFormatted: formatPrice(product.price * product.quantity),
  } as CartFormatted));

  const total = cart.reduce((sumTotal, product) => {
    return sumTotal += product.price * product.quantity
  }, 0);

  const handleSuccessfulPurchase = (): void => {
    if (!cartFormatted.length) {
      toast.error('Carrinho esta vazio!')
    } else {
      toast.success('Compra realizada com sucesso!')
    }
  }

  return (
    <Container>
      <Title>Meu carrinho</Title>
      <ProductTable>
        <tbody>
          {cartFormatted.map((product, _) => {
            return (
              <tr data-testid="product" key={product.id}>
                <td>
                  <Image src={product.imageUrl} alt={product.name} />
                </td>
                <td>
                  <strong>{product.name}</strong>
                  <span>{product.priceFormatted}</span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </ProductTable>

      <Footer>
        <Total>
          <span>Total</span>
          <strong>{formatPrice(total)}</strong>
        </Total>
        {
          Number(total) > minimumAmountForFreeShipping ?
            <FreeShipping>Parabéns, sua compra tem frete grátis!</FreeShipping>
            : null
        }
      </Footer>
      <ContentButton onClick={handleSuccessfulPurchase}>
        <button type="button">Finalizar pedido</button>
      </ContentButton>
    </Container>
  );
};

export default Cart;
