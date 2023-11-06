import { tokens } from "@/Context/theme";
import HeaderUser from "@/components/Header/HeaderUser";
import { useTheme } from "@mui/material";
import { Layout, Segmented } from "antd";
import { SegmentedValue } from "antd/es/segmented";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const { Content } = Layout;
const options = [
  {
    label: "Có thể bạn biết",
    value: "Tin nhắn đang chờ",
  },
  {
    label: "Spam",
    value: "Spam",
  },
];

const MessageWaiting = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const mode = theme.palette.mode;
  const [current, setCurrent] = useState<SegmentedValue | string>();
  const [valueSearch, setValueSearch] = useState<string>("");

  useEffect(() => {
    setTimeout(() => {
      toast.info("Trang này tạm thời chưa sử dụng!!");
    }, 3000);
  }, []);
  return (
    <Content>
      <div
        style={{
          width: 270,
          flex: "0 0 270px",
          maxWidth: "270px",
          minWidth: "270px",
          height: "100%",
          borderRight:
            mode === "light"
              ? "0.1px solid rgb(233 230 230)"
              : `0.1px solid ${colors.grey[100]}`,
          background: colors.primary[100],
          color: colors.secondary[100],
        }}
      >
        <HeaderUser
          valueSearch={valueSearch}
          setValueSearch={setValueSearch}
          title={`${
            current === "Có thể bạn biết"
              ? "Có thể bạn biết"
              : current === "Spam"
              ? "Spam"
              : "Tin nhắn đang chờ"
          }`}
        />
        <div className="mt-5 px-3">
          <Segmented
            value={current}
            block
            options={options}
            onChange={(value) => setCurrent(value)}
            width={"100%"}
          />
        </div>
      </div>
    </Content>
  );
};

export default MessageWaiting;
