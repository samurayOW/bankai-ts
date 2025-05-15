import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./features/home/homeSlice";
import buyMangaReducer from "./features/buyManga/buyMangaSlice";
import mangaReducer from "./features/manga/mangaSlice";
import cartReducer from "./features/cart/cartSlice";
import authReducer from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    home: homeReducer,
    buyManga: buyMangaReducer,
    manga: mangaReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
