import { createSelector } from "reselect";

// Input selector -> A function that gets all of state and just get the slice of it
const selectCart = (state) => state.cart;

// Output selector
export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItem) =>
    cartItem.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

export const selectCartTotal = createSelector([selectCartItems], (cartItem) =>
  cartItem.reduce((accumulatedPrice, cartItem) => {
    return accumulatedPrice + (cartItem.price * cartItem.quantity);
  }, 0)
);
