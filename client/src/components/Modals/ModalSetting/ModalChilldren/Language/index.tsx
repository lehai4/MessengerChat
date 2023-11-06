import { tokens } from "@/Context/theme";
import { useTheme } from "@mui/material";
import { Typography } from "antd";
import React from "react";

const Language = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <React.Fragment>
      <Typography.Text
        strong
        style={{ fontSize: 17, color: colors.secondary[100] }}
      >
        Ngôn ngữ
      </Typography.Text>

      <Typography.Text
        type="secondary"
        className="block text-sm"
        style={{ color: colors.secondary[100] }}
      >
        Ứng dụng Messenger dành cho máy tính sẽ tự động mở khi bạn dùng
        Messenger trên messenger.com.
      </Typography.Text>
    </React.Fragment>
  );
};

export default Language;
