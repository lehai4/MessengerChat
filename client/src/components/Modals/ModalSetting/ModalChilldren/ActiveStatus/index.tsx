import { tokens } from "@/Context/theme";
import { useTheme } from "@mui/material";
import { Divider, Switch, Typography } from "antd";
import Link from "antd/es/typography/Link";
import React from "react";

const ActiveStatus = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <React.Fragment>
      <Typography.Text
        strong
        style={{ fontSize: 19, color: colors.secondary[100] }}
      >
        Trạng thái hoạt động
      </Typography.Text>
      <Typography.Text
        strong
        style={{
          fontSize: 16,
          padding: "8px 0 22px 0",
          color: colors.secondary[100],
        }}
      >
        Hiển thị trạng thái hoạt động
      </Typography.Text>
      <Switch defaultChecked onChange={() => {}} className="w-max" />
      <Typography.Text
        className="font-bold pt-4"
        style={{ fontSize: 16, color: colors.secondary[100] }}
      >
        Trạng thái hoạt động
      </Typography.Text>
      <Divider style={{ margin: "18px 0" }} />
      <Typography.Text
        type="secondary"
        className="block text-sm pb-3"
        style={{ color: colors.secondary[100] }}
      >
        Bạn bè và người liên hệ của bạn sẽ biết khi nào bạn đang hoạt động hoặc
        hoạt động gần đây. Bạn sẽ hiển thị là đang hoạt động hoặc hoạt động gần
        đây, trừ khi bạn tắt cài đặt này ở mọi nơi bạn đang dùng Messenger hoặc
        Facebook. Bạn cũng sẽ biết khi nào bạn bè và người liên hệ của mình hoạt
        động hoặc hoạt động gần đây.
      </Typography.Text>
      <Link
        underline
        strong
        className="text-base"
        style={{ color: colors.secondary[100] }}
      >
        Tìm hiểu thêm
      </Link>
    </React.Fragment>
  );
};

export default ActiveStatus;
