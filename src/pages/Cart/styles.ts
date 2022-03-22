import styled from "styled-components";
import { darken } from "polished";

export const Container = styled.div`
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
  width: 50%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

export const Title = styled.div`
  border-bottom: 1px solid #d6d6d6;
  text-align: center;
  padding: 20px;
  font-size: 18px;
  font-weight: bold;
`;

export const Image = styled.img`
  border: 1px solid #d6d6d6;
  text-align: center;
  padding: 0 15px;
  height: 100px;
`;

export const ProductTable = styled.table`
  width: 100%;

  tbody td {
    padding: 12px;
  }

  strong {
    text-transform: lowercase;
    color: #333;
    display: block;
  }

  strong::first-letter {
    text-transform: uppercase;
  }

  span {
    display: block;
    margin-top: 5px;
    font-size: 14px;
    font-weight: bold;
  }
`;

export const Footer = styled.div`
  border-top: 1px solid #d6d6d6;
  text-align: center;
  padding: 26px;
`;

export const Total = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;

  span {
    font-size: 18px;

    color: #000;
    font-weight: bold;
  }

  strong {
    font-size: 18px;
    margin-left: 5px;
  }
`;

export const FreeShipping = styled.div`
  margin: 0 auto;
  width: 380px;
  margin-top: 20px;
  padding: 10px;
  text-align: center;
  background: #9dff89;
  border-radius: 20px;

  font-size: 16px;
  font-weight: bold;
  color: #45703b;
`;

export const ContentButton = styled.div`
  border-top: 1px solid #d6d6d6;
  text-align: center;

  button {
    background: #0076ec;
    color: #fff;
    border: 0;
    width: 28rem;
    margin: 0.8rem 0;
    border-radius: 10px;
    padding: 1.2rem 1rem;
    font-weight: bold;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.06, "#0076EC")};
    }
  }
`;
