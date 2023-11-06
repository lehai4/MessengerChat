import { ColorModeContext, tokens } from "@/Context/theme";
import { Selected } from "@/components";
import { useTheme } from "@mui/material";
import { Divider, Typography } from "antd";
import React, { useContext, useState } from "react";
import { Option } from "@/interface";

const themeOption = [
  {
    label: "light",
    value: "light",
  },
  {
    label: "dark",
    value: "dark",
  },
];
const zoomOption = [
  {
    label: "Nhỏ (80%)",
    value: "nhỏ (80%)",
  },
  {
    label: "Bình thường (100%)",
    value: "bình thường (100%)",
  },
  {
    label: "Lớn (115%)",
    value: "lớn (115%)",
  },
  {
    label: "Cực lớn (150%)",
    value: "cực lớn (150%)",
  },
];
type ThemeProps = {
  mode: string;
  setMode: (mode: string) => void;
};
const Theme = ({ mode, setMode }: ThemeProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [themes, setThemes] = useState<Option>({
    label: JSON.parse(localStorage.getItem("theme") as any),
    value: JSON.parse(localStorage.getItem("theme") as any),
  });
  const [zoom, setZoom] = useState<Option>({
    label: "Bình thường (100%)",
    value: "bình thường (100%)",
  });
  const handleChange = (e: any) => {
    setThemes(e);
    setMode(e);
    colorMode.toggleColorMode();
  };

  return (
    <React.Fragment>
      <Typography.Text
        strong
        style={{ fontSize: 19, color: colors.secondary[100] }}
      >
        Giao diện
      </Typography.Text>
      <Typography.Text
        strong
        style={{
          fontSize: 16,
          padding: "8px 0 22px 0",
          color: colors.secondary[100],
        }}
      >
        Chủ đề
      </Typography.Text>
      <Selected
        options={themeOption}
        value={themes}
        handleChange={handleChange}
        size="middle"
      />
      <Divider
        style={{
          margin: "14px 0",

          background: mode === "light" ? "rgb(255 253 253)" : "gray",
        }}
      />
      <Typography.Text
        strong
        style={{
          fontSize: 16,
          padding: "8px 0 22px 0",
          color: colors.secondary[100],
        }}
      >
        Màu sắc của biểu tượng cảm xúc
      </Typography.Text>
      <Divider
        style={{
          margin: "14px 0",
          background: mode === "light" ? "rgb(255 253 253)" : "gray",
        }}
      />
      <Typography.Text
        strong
        style={{
          fontSize: 16,
          padding: "8px 0 8px 0",
          color: colors.secondary[100],
        }}
      >
        Mức độ thu phóng
      </Typography.Text>
      <Selected
        options={zoomOption}
        value={zoom}
        handleChange={(e) => setZoom(e)}
        size="middle"
      />
      <Typography.Text
        type="secondary"
        style={{
          fontSize: 16,
          padding: "8px 0 22px 0",
          color: colors.secondary[100],
        }}
      >
        Thu phóng mọi thứ trong Messenger
      </Typography.Text>
    </React.Fragment>
  );
};

export default Theme;
