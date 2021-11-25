// Middleware -> Catches the actions and do something about it and send again to the reducer
import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";

// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import { fetchCollectionStart } from "./shop/shop.sagas";

import rootReducer from "./root-reducer";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(fetchCollectionStart);

// Ensuring that whenever there is a change to the state, it will persist to the persisted storage.
export const persistor = persistStore(store);
