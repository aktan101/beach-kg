import { configureStore } from "@reduxjs/toolkit"
import beachesReducer from "./slices/beachesSlice"
import cartReducer from "./slices/cartSlice"
import favoritesReducer from "./slices/favoritesSlice"
import userReducer from "./slices/userSlice"
import languageReducer from "./slices/languageSlice"

export const store = configureStore({
  reducer: {
    beaches: beachesReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
    user: userReducer,
    language: languageReducer,
  },
})

