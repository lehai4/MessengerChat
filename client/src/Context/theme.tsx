import { createTheme } from "@mui/material/styles";
import { createContext, useEffect, useMemo, useState } from "react";

type ThemeContext = {
  mode: string;
  theme: any;
  toggleColorMode: () => void;
};
// color design tokens export
export const tokens = (mode: any) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#383838",
        },
        primary: {
          100: "#101010",
          200: "#000000",
        },
        secondary: {
          100: "#FFFFFF",
          200: "#C0C0C0",
          300: "",
          400: "#505050",
        },
      }
    : {
        grey: {
          100: "#F5F5F5",
        },
        primary: {
          100: "#FFFFFF",
          200: "#F8F8F8",
        },
        secondary: {
          100: "#000000",
          200: "#303030",
          300: "#DCDCDC",
        },
      }),
});

// mui theme settings
export const themeSettings = (mode: any) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: colors.primary[100],
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[100],
            },
          }),
    },
  };
};

// context for color mode
export const ColorModeContext = createContext<ThemeContext | any>({
  toggleColorMode: () => {},
});
export const useMode = () => {
  const [mode, setMode] = useState<string>(
    JSON.parse(localStorage.getItem("theme") as any) || "dark"
  );
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(mode));
  }, [mode]);
  const theme: any = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
