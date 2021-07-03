// Middleware -> Catches the actions and do something about it and send again to the reducer
import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";

import rootReducer from "./root-reducer";

const middlewares = [];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// Ensuring that whenever there is a change to the state, it will persist to the persisted storage.
export const persistor = persistStore(store);
