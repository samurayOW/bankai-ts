import { createSlice } from "@reduxjs/toolkit";
import { Manga, Genre, Feedback } from "../../utils/interfaces";

interface State {
  newArrivalsList: Manga[];
  genresList: Genre[];
  feedbacksList: Feedback[];
}

const initialState: State = {
  newArrivalsList: [],
  genresList: [],
  feedbacksList: [],
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setNewArrivalsList: (state, action) => {
      state.newArrivalsList = action.payload;
    },
    setGenresList: (state, action) => {
      state.genresList = action.payload;
    },
    setFeedbacksList: (state, action) => {
      state.feedbacksList = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNewArrivalsList, setGenresList, setFeedbacksList } =
  homeSlice.actions;

export default homeSlice.reducer;
