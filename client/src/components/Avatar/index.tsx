import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { Avatar } from "antd";
import { CSSProperties } from "react";

type AvatarProps = { src: string; online: boolean; style?: CSSProperties };
const AvatarFriend = ({ src, online, style }: AvatarProps) => {
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: online ? "#44b700" : "red",
      color: online ? "#44b700" : "red",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));
  return (
    <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      variant="dot"
    >
      <Avatar size={"large"} src={src} style={style} />
    </StyledBadge>
  );
};

export default AvatarFriend;
