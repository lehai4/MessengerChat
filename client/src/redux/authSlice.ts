import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const login: PropLogin = {
  currentUser: null,
  isFetching: false,
  error: false,
};
const logOut: PropLogOut = {
  isFetching: false,
  error: false,
};
type initialStateType = {
  login: PropLogin;
  logOut: PropLogOut;
};

const initialState: initialStateType = {
  login,
  logOut,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Login
    signInStart: (state) => {
      state.login.isFetching = true;
    },
    signInSuccess: (state, action: PayloadAction<currentUserProps>) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
    },
    signInFailure: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    // logout
    logOutStart: (state) => {
      state.login.isFetching = true;
    },
    logOutSuccess: (state) => {
      state.login.isFetching = false;
      state.login.currentUser = null;
      state.login.error = false;
    },
    logOutFailure: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
  },
});
export const {
  signInStart,
  signInSuccess,
  signInFailure,
  logOutStart,
  logOutSuccess,
  logOutFailure,
} = authSlice.actions;
export default authSlice.reducer;
