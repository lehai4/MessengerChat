import { tokens } from "@/Context/theme";
import { useTheme } from "@mui/material";
import { Divider, List, Switch, Typography } from "antd";
import React from "react";
const dataList = [
  {
    title:
      "Hiển thị ứng dụng Messenger dành cho máy tính trong Khay hệ thống trên Windows",
  },
  {
    title: "Mở ứng dụng Messenger dành cho máy tính khi bạn khởi động máy tính",
  },
  {
    title:
      "Mở ứng dụng Messenger dành cho máy tính khi bạn dùng Messenger trong trình duyệt",
  },
];

const Shared = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <React.Fragment>
      <Typography.Text
        strong
        style={{ fontSize: 19, color: colors.secondary[100] }}
      >
        Chung
      </Typography.Text>
      <List
        itemLayout="vertical"
        dataSource={dataList}
        renderItem={(item, _) => (
          <List.Item>
            <Typography.Text
              strong
              className="block text-base pb-6"
              style={{ color: colors.secondary[100] }}
            >
              {item.title}
            </Typography.Text>
            <Switch defaultChecked onChange={() => {}} />
          </List.Item>
        )}
      />
      <Typography.Text
        type="secondary"
        className="block text-sm"
        style={{ color: colors.secondary[100] }}
      >
        Ứng dụng Messenger dành cho máy tính sẽ tự động mở khi bạn dùng
        Messenger trên messenger.com.
      </Typography.Text>
      <Divider />
    </React.Fragment>
  );
};

export default Shared;
