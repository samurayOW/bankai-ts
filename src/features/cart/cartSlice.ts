import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Manga } from "../../utils/interfaces";

interface Order {
  manga: Manga;
  amount: number;
}

interface State {
  orderList: Order[];
  deliveryFee: number;
  sum: number;
}

const initialState: State = {
  orderList: [],
  deliveryFee: 15,
  sum: 0,
};

export const mangaSlice = createSlice({
  name: "manga",
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<{ order: Manga; amount: number }>) {
      const { order, amount } = action.payload;
      const existingOrder = state.orderList.find(
        (item) => item.manga.documentId === order.documentId
      );
      if (existingOrder) {
        existingOrder.amount += amount;
      } else {
        state.orderList.push({ manga: order, amount });
      }
    },
    increaseAmount(state, action: PayloadAction<string>) {
      const order = state.orderList.find(
        (item) => item.manga.documentId === action.payload
      );
      if (order) {
        order.amount += 1;
      }
    },
    decreaseAmount(state, action: PayloadAction<string>) {
      const order = state.orderList.find(
        (item) => item.manga.documentId === action.payload
      );
      if (order && order.amount > 1) {
        order.amount -= 1;
      }
    },
    removeOrder(state, action: PayloadAction<string>) {
      state.orderList = state.orderList.filter(
        (item) => item.manga.documentId !== action.payload
      );
    },
    clearCart(state) {
      state.orderList = [];
    },
    setSum(state, action: PayloadAction<number>) {
      state.sum = action.payload;
    },
  },
});

export const {
  addOrder,
  increaseAmount,
  decreaseAmount,
  removeOrder,
  clearCart,
  setSum,
} = mangaSlice.actions;

export default mangaSlice.reducer;
