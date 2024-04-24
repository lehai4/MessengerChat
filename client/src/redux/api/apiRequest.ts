import axios from "axios";
import {
  logOutFailure,
  logOutStart,
  logOutSuccess,
  signInFailure,
  signInStart,
  signInSuccess,
} from "@/redux/authSlice";
import { toast } from "react-toastify";

export const signInUser = async (user: any, dispatch: any, navigate: any) => {
  dispatch(signInStart());
  try {
    const res: any = await axios({
      method: "POST",
      url: `/auth/signIn`,
      data: user,
      // withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    dispatch(signInSuccess(res.data));
    navigate("/chat");
    toast.success("Login successfully!");
  } catch (e) {
    dispatch(signInFailure());
    toast.error("Login failed!");
  }
};
export const getProfile = async (
  id: string | undefined,
  accessToken: any,
  dispatch: any
) => {
  try {
    const res: any = await axios({
      method: "GET",
      url: `/users/profile/${id}`,
      // withCredentials: true,

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(signInSuccess(res.data));
  } catch (e) {
    dispatch(signInFailure());
  }
};
export const logOut = async (dispatch: any, navigate: any) => {
  dispatch(logOutStart());
  try {
    await axios({
      method: "POST",
      url: `/auth/logout`,
      // withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    dispatch(logOutSuccess());
    navigate("/auth/login");
  } catch (err) {
    dispatch(logOutFailure());
  }
};
