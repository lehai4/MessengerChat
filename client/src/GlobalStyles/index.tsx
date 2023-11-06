import React, { Fragment } from "react";
import "./style.scss";
type GlobalStyleProps = {
  children: React.ReactNode;
};
const GlobalStyle = ({ children }: GlobalStyleProps): JSX.Element => {
  return <Fragment>{children}</Fragment>;
};

export default GlobalStyle;
