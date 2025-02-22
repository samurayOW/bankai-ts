import { createSlice } from "@reduxjs/toolkit";
import { Manga } from "../../utils/interfaces";

interface State {
  manga?: Manga;
}

const initialState: State = {
  manga: undefined,
};

export const mangaSlice = createSlice({
  name: "manga",
  initialState,
  reducers: {
    setManga(state, action) {
      state.manga = action.payload;
    },
  },
});

export const { setManga } = mangaSlice.actions;

export default mangaSlice.reducer;
