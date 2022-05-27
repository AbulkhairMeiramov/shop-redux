import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token")
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    setRemoveToken(state, action) {
      state.token = null;
      localStorage.setItem("token", action.payload);
    }
  }
});

export const { setToken, setCurrentUser, setRemoveToken } = authSlice.actions;

export const authReducer = authSlice.reducer;
