import React from "react";
import { connect } from "react-redux";
import {
  clearItemFromCart,
  removeItemFromCart,
  addItem,
} from "../../redux/cart/cart.actions.js";

import "./checkout-item.styles.scss";

const CheckoutItem = ({
  cartItem,
  clearItemFromCart,
  removeItemFromCart,
  addItem,
}) => {
  const { imageUrl, name, quantity, price } = cartItem;
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt="item" />
      </div>

      <span className="name">{name}</span>
      <span className="quantity">
        <div onClick={() => removeItemFromCart(cartItem)} className="arrow">
          &#10094;
        </div>
        <span className="value"> {quantity}</span>
        <div onClick={() => addItem(cartItem)} className="arrow">
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div
        className="remove-button"
        onClick={() => clearItemFromCart(cartItem)}
      >
        &#10005;
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearItemFromCart: (item) => dispatch(clearItemFromCart(item)),
    removeItemFromCart: (item) => dispatch(removeItemFromCart(item)),
    addItem: (item) => dispatch(addItem(item)),
  };
};

export default connect(null, mapDispatchToProps)(CheckoutItem);
