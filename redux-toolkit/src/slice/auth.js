// import { createSlice } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";
import { setItem } from "../helpers/src/helpers/persistance-storage";

const initialState = {
  isLoading: false,
  loggedin: false,
  user: null,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUsersStart: (state) => {
      state.isLoading = true;
    },
    signUserSuccess: (state, action) => {
      state.loggedin = true;
      state.isLoading = false;
      state.user = action.payload;
      setItem("token", action.payload.token);
      // localStorage.setItem(action.payload.token);
    },

    signUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logoutUser: (state) => {
      (state.user = null), (state.loggedin = false);
    },
    getUserStart: (state) => {
      state.isLoading = true;
    },
    getUserSuccess: (state, action) => {
      state.isLoading = false;
      // state.user = action.payload;
    },
    getUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  logoutUser,
  signUserFailure,
  signUserSuccess,
  signUsersStart,
  getUserFailure,
  getUserStart,
  getUserSuccess,
} = authSlice.actions;
export default authSlice.reducer;
