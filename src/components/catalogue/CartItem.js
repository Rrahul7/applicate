import React from "react";
import Button from "@material-ui/core/Button";
import { Wrapper } from "./styles/CartItem.styles";

const CartItem = ({ item, addToCart, removeFromCart }) => (
  <Wrapper>
    <div>
      <h5>{item.title}</h5>
      <div className="information">
        <p>Price: ₹{item.price}</p>
        <p>Total: ₹{(item.amount * item.price).toFixed(2)}</p>
      </div>
      <div className="buttons">
        <Button
          size="small"
          disableElevation
          variant="contained"
          onClick={() => removeFromCart(item.id)}
        >
          -
        </Button>
        <p>{item.amount}</p>
        <Button
          size="small"
          disableElevation
          variant="contained"
          onClick={() => addToCart(item)}
        >
          +
        </Button>
      </div>
    </div>
    <img src={item.image} alt={item.title} />
  </Wrapper>
);

export default CartItem;
