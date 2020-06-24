import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; //get window localstorage

import cartReducer from "./cart/cart-reducer";
import shopReducer from "./shop/shop-reducer";
import navBarReducer from "./nav-bar/navBar-reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
  blacklist: ["shop"],
};

const rootReducer = combineReducers({
  cart: cartReducer,
  shop: shopReducer,
  navBar: navBarReducer,
});

export default persistReducer(persistConfig, rootReducer);
