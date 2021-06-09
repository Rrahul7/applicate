import React from "react";
import Button from "@material-ui/core/Button";
import { Wrapper } from "./styles/Product.styles";

const Product = ({ product, handleAddToCart }) => (
  <Wrapper>
    <img src={product.image} alt={product.title} />
    <div>
      <h5>{product.title}</h5>
      <h6>₹{product.price}</h6>
    </div>
    <Button onClick={() => handleAddToCart(product)}>Add to cart</Button>
  </Wrapper>
);

export default Product;
