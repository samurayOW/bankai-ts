import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

interface State {
  isAuthenticated: boolean;
  id: number;
  email: string;
  name: string;
  date: string;
  token: string;
}

const initialState: State = {
  isAuthenticated: false,
  id: 0,
  email: "",
  name: "",
  date: dayjs().format("YYYY-MM-DD"),
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { id, email, name, date, token } = action.payload;
      state.isAuthenticated = true;
      state.id = action.payload.id;
      state.email = email;
      state.date = date;
      state.name = name;
      state.token = token;
      localStorage.setItem("id", id);
      localStorage.setItem("email", email);
      localStorage.setItem("name", name);
      localStorage.setItem("date", date);
      localStorage.setItem("token", token);
    },
    logOut: (state) => {
      state.isAuthenticated = false;
      state.email = "";
      state.date = dayjs().format("YYYY-MM-DD");
      state.name = "";
      state.token = "";
      localStorage.clear();
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, logOut } = authSlice.actions;

export default authSlice.reducer;
