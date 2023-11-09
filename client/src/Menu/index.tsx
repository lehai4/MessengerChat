import { MessageOutlined } from "@ant-design/icons";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import StoreRoundedIcon from "@mui/icons-material/StoreRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import { SvgIcon, useTheme } from "@mui/material";
import { Menu, MenuProps } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import convertPath from "../utils/convertPath";
import { tokens } from "@/Context/theme";
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode
): MenuItem {
  return {
    key,
    icon,
    label,
  } as MenuItem;
}
const items: MenuProps["items"] = [
  getItem(
    <h3 className="flex flex-rows items-center gap-3">
      <SvgIcon component={ChatBubbleIcon} color="inherit" fontSize="small" />
    </h3>,
    "/chat"
  ),
  getItem(
    <h3 className="flex flex-rows items-center gap-3">
      <SvgIcon
        component={StorefrontRoundedIcon}
        color="inherit"
        fontSize="small"
      />
    </h3>,
    "/marketplace"
  ),
  getItem(
    <h3 className="flex flex-rows items-center gap-3">
      <MessageOutlined style={{ fontSize: 20 }} />
    </h3>,
    "/waiting-message"
  ),
  getItem(
    <h3 className="flex flex-rows items-center gap-3">
      <SvgIcon component={StoreRoundedIcon} color="inherit" fontSize="small" />
    </h3>,
    "/store"
  ),
];
const MenuBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const mode = theme.palette.mode;

  const navigate = useNavigate();
  const pathname = useLocation();

  const handleClick = (item: any) => {
    navigate(item.key);
  };

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={[`${convertPath(pathname.pathname)}`]}
      onClick={(item) => handleClick(item)}
      selectedKeys={[`${convertPath(pathname.pathname)}`]}
      items={items}
      theme={mode === "dark" ? "dark" : "light"}
      style={{
        background: "inherit",
        color: mode === "dark" ? colors.secondary[200] : "black",
        border: "none",
      }}
    />
  );
};

export default MenuBar;
