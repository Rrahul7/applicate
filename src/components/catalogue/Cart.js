import React, { useState } from "react";
import { Wrapper, StyledButton } from "./styles/Cart.styles";
import CartItem from "./CartItem";
import CheckoutPage from "./CheckoutPage";
import Drawer from "@material-ui/core/Drawer";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const Cart = ({ cartItems, addToCart, removeFromCart, submitCart }) => {
  const [checkout, setCheckout] = useState(false);
  const calculateTotal = (items) =>
    items.reduce((ack, item) => ack + item.amount * item.price, 0);

  return (
    <Wrapper>
      <h2>Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: ₹{calculateTotal(cartItems).toFixed(2)}</h2>
      <Drawer
        anchor="bottom"
        open={checkout}
        onClose={() => setCheckout(false)}
      >
        <CheckoutPage
          cartItems={cartItems}
          handleClose={() => setCheckout(false)}
          handleCartSubmit={() => submitCart()}
        />
      </Drawer>
      <StyledButton onClick={() => setCheckout(true)}>
        <ArrowForwardIcon fontSize="large" />
      </StyledButton>
    </Wrapper>
  );
};

export default Cart;
