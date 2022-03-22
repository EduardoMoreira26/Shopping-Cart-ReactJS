import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../util/format';
import { Container, Image, ProductTable, Total, Title, Footer, FreeShipping, ContentButton } from './styles';

interface Product {
  id: string;
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  priceTags: [
    {
      value: number,
      rawValue: number,
      isPercentual: false,
    }
  ],

}

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

  return (
    <Container>
      <Title>Meu carrinho</Title>
      <ProductTable>
        <tbody>
          {cartFormatted.map((product, index) => {
            const discountValue = product.priceTags.map((e => e.value));
            return (
              <tr data-testid="product" key={product.id}>
                <td>
                  <Image src={product.imageUrl} alt={product.name} />
                </td>
                <td>
                  <strong>{product.name}</strong>
                  {/* <span>{Number(product.priceFormatted) - discountValue[index] / 100}</span> */}
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
          Number(total) > 10 ? <FreeShipping>Parabéns, sua compra tem frete grátis!</FreeShipping> : null
        }
      </Footer>
      <ContentButton>
        <button type="button">Finalizar pedido</button>
      </ContentButton>
    </Container>
  );
};

export default Cart;
