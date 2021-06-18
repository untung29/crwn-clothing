// Represent all of the reducers
import { combineReducers } from "redux";

// Wrap the reducers and pass it to the persistStore so that it will persist the storage whenever the state changes.
import { persistReducer } from "redux-persist";

// To tell the result that we want to use local storage
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user-reducer";
import cartReducer from "./cart/cart.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

export default persistReducer(persistConfig, rootReducer);
