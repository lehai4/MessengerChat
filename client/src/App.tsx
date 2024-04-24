import GlobalStyles from "@/GlobalStyles";
import MenuBar from "@/Menu";
import { Setting } from "@/components";
import Router from "@/routes";
import { ThemeProvider } from "@mui/material";
import { Layout } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { ColorModeContext, useMode } from "./Context/theme";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { getProfile } from "./redux/api/apiRequest";
const { Sider } = Layout;

function App() {
  axios.defaults.baseURL = "http://localhost:8000/v1";
  const dispatch = useAppDispatch();

  const userSignIn = useAppSelector((state) => state.auth.login.currentUser);
  const [theme, colorMode] = useMode();

  useEffect(() => {
    (async function get() {
      await getProfile(
        userSignIn?.user?._id,
        userSignIn?.accessToken,
        dispatch
      );
    })();
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <GlobalStyles>
          <ToastContainer
            position="bottom-left"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Layout
            style={{
              maxHeight: "100vh",
              height: "100vh",
              overflow: "hidden",
              width: "100%",
            }}
          >
            {userSignIn?.user ? (
              <React.Fragment>
                <Sider
                  width={80}
                  className="max-h-screen relative"
                  style={{
                    background:
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[900],
                  }}
                >
                  <div className="demo-logo-vertical"></div>
                  <MenuBar />
                  <Setting />
                </Sider>
                <Layout className="w-full h-full max-screen flex-row bg-white">
                  <Router />
                </Layout>
              </React.Fragment>
            ) : (
              <Router />
            )}
          </Layout>
        </GlobalStyles>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
