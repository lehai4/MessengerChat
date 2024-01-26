import { Chat } from "@/Pages";
import { Authentication } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getProfile } from "@/redux/api/apiRequest";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

export interface IRouterProps {}
const Router: React.FunctionComponent<IRouterProps> = () => {
  const dataLogin = useAppSelector((state) => state.auth.login.currentUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async function get() {
      await getProfile(dataLogin?.user?._id, dataLogin?.accessToken, dispatch);
    })();
  }, []);
  return (
    <Routes>
      <Route
        path="/"
        element={
          dataLogin?.user === undefined ? (
            <Navigate to="/auth" />
          ) : (
            <Navigate to="/chat" />
          )
        }
      />
      <Route
        path="/chat"
        element={
          dataLogin?.user === undefined ? <Navigate to="/auth" /> : <Chat />
        }
      />
      <Route path="/auth" element={<Authentication />} />
    </Routes>
  );
};

export default Router;
