import React from "react";
import { Wrapper } from "./styles/CheckoutPage.styles";
import {
  List,
  ListItem,
  Button,
  Typography,
  ListItemText,
  Box,
} from "@material-ui/core";

const CheckoutPage = ({ cartItems, handleClose, handleCartSubmit }) => {
  const calculateTotal = (items) =>
    items.reduce((ack, item) => ack + item.amount * item.price, 0);

  const handleSubmit = () => {
    handleClose();
    handleCartSubmit();
  };

  return (
    <>
      <List>
        {cartItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemText
              primary={item.title}
              secondary={`Quantity: ${item.amount}`}
            />
            <Typography variant="body2">
              ₹{(item.amount * item.price).toFixed(2)}
            </Typography>
          </ListItem>
        ))}
        <ListItem>
          <ListItemText primary="Total price" />
          <Typography variant="body2">
            ₹{calculateTotal(cartItems).toFixed(2)}
          </Typography>
        </ListItem>
      </List>
      <Box display="flex" justifyContent="center">
        <Button size="medium" variant="contained" onClick={() => handleClose()}>
          Go Back
        </Button>
        <Button
          size="medium"
          color="primary"
          variant="contained"
          onClick={() => handleSubmit()}
        >
          Buy Now
        </Button>
      </Box>
    </>
  );
};

export default CheckoutPage;
