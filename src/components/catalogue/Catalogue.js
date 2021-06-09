import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import _ from "lodash";
// Components

import { makeStyles } from "@material-ui/core/styles";
import Product from "./Product";
import Cart from "./Cart";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";
import { Alert } from "@material-ui/lab";
import { Wrapper, StyledButton } from "./styles/Catalogue.styles";
import FilterListIcon from "@material-ui/icons/FilterList";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { getProducts } from "../../api/orderApi";

// const getProducts = async () =>
//   await (await fetch("https://fakestoreapi.com/products")).json();

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Catalogue = () => {
  const [alert, setAlert] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    getProducts().then((resp) => {
      setData(resp);
      setCategory(_.uniq(_.map(resp, "category")));
    });
    return () => {
      setData([]);
    };
  }, []);

  const getTotalItems = (items) =>
    items.reduce((ack, item) => ack + item.amount, 0);

  const handleCategoryChange = async (e) => {
    e.preventDefault();
    let cat = e.target.value;
    setCategoryName(cat);
    let resp = await getProducts();
    if (cat == "") {
      setData(resp);
    } else {
      resp = _.filter(resp, (product) => product.category == cat);
      setData(resp);
    }
  };

  const handleAddToCart = (clickedItem) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [])
    );
  };

  const handleSubmitCart = () => {
    setCartItems([]);
    setCartOpen(false);
    setAlert(true);
    return <Redirect to="/" />;
  };

  const classes = useStyles();

  return (
    <Wrapper>
      {alert ? (
        <Alert onClose={() => setAlert(false)} severity="success">
          Thank you for shopping with us !
        </Alert>
      ) : (
        <></>
      )}
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
          submitCart={handleSubmitCart}
        />
      </Drawer>

      <FormControl className={classes.formControl}>
        <InputLabel>Category</InputLabel>
        <Select
          value={categoryName}
          IconComponent={FilterListIcon}
          onChange={handleCategoryChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {category.map((val, index) => (
            <MenuItem key={index} value={val}>
              {val}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Filter by Category</FormHelperText>
      </FormControl>

      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCartIcon fontSize="large" />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Product product={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default Catalogue;
