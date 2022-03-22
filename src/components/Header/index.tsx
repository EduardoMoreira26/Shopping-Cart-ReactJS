import { Link } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

import { Container, Cart, BackPage } from './styles';
import { useCart } from '../../hooks/useCart';

const Header = (): JSX.Element => {
  const { cart } = useCart();
  const cartSize = cart.length;

  return (
    <Container>
      <BackPage>
        <Link to="/">
          <FiArrowLeft size={20} color="#000" />
        </Link>
      </BackPage>

      <Cart to="/cart">
        <div>
          <strong>Ver meu carrinho</strong>
          <span data-testid="cart-size">
            {cartSize === 1 ? `${cartSize} item` : `${cartSize} itens`}
          </span>
        </div>
        <FiArrowRight size={20} color="#000" />
      </Cart>
    </Container>
  );
};

export default Header;
