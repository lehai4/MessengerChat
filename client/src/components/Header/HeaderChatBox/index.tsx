import AvatarFriend from "@/components/Avatar";
import { EllipsisOutlined } from "@ant-design/icons";
import CallIcon from "@mui/icons-material/Call";
import SearchIcon from "@mui/icons-material/Search";
import VideocamIcon from "@mui/icons-material/Videocam";
import { SvgIcon } from "@mui/material";
import { Select, Space, Tooltip, Typography } from "antd";
import { toast } from "react-toastify";
const { Option } = Select;

type HeaderChatBoxProps = {
  selectedUser: any;
  mode: string;
  colors: any;
  prepareChat: boolean;
  newToggleUserChat: boolean;
  optionsSelectChat: any[];
  refSelectHeader: any;
  setNameUser: (data: string[]) => void;
  setNewToggleUserChat: (flag: boolean) => void;
};
const HeaderChatBox = ({
  selectedUser,
  mode,
  colors,
  prepareChat,
  refSelectHeader,
  newToggleUserChat,
  optionsSelectChat,
  setNameUser,
  setNewToggleUserChat,
}: HeaderChatBoxProps) => {
  return (
    <Space
      direction="horizontal"
      className="h-16 px-3 flex justify-between"
      style={{
        borderBottom:
          mode === "dark"
            ? `1px solid rgb(47 45 45)`
            : `1px solid rgba(0, 0, 0,0.05)`,
      }}
    >
      {!prepareChat ? (
        <>
          <Space direction="horizontal">
            <AvatarFriend
              src={selectedUser?.avatar}
              online={selectedUser?.active ? true : false}
              style={{
                background: colors.secondary[400],
              }}
            />
            <Space
              direction="vertical"
              style={{
                gap: 0,
                color: colors.secondary[100],
              }}
            >
              <Typography.Text
                className="leading-none font-bold"
                style={{
                  color: colors.secondary[100],
                }}
              >
                {selectedUser?.name}
              </Typography.Text>
              <Typography.Text
                className="leading-none font-normal"
                style={{
                  color: colors.secondary[200],
                }}
              >
                {selectedUser?.active ? "Đang hoạt động" : "Không hoạt động"}
              </Typography.Text>
            </Space>
          </Space>
          <Space direction="horizontal" style={{ gap: 15 }}>
            {[
              { id: 0, icon: CallIcon, tooltip: "Gọi thoại" },
              { id: 1, icon: VideocamIcon, tooltip: "Cuộc gọi video" },
              {
                id: 2,
                icon: SearchIcon,
                tooltip: "Tìm kiếm tin nhắn (Ctrl+F)",
              },
              { id: 3, icon: EllipsisOutlined, tooltip: "Tùy chọn chat" },
            ].map((_, i) => (
              <Tooltip
                key={i}
                title={_.tooltip}
                mouseEnterDelay={0.5}
                placement="topRight"
                color={mode === "dark" ? colors.grey[100] : ""}
              >
                <SvgIcon
                  component={_.icon}
                  sx={{ color: "#9236e7", fontWeight: 700 }}
                  className="hover:text-purple-800"
                  onClick={() => {
                    if (_.id == 3) {
                      console.log("Enter...");
                    } else {
                      toast.warning("Xin lỗi chức năng này không thể sử dụng");
                    }
                  }}
                />
              </Tooltip>
            ))}
          </Space>
        </>
      ) : (
        <Space>
          <Typography.Text
            style={{
              color: colors.secondary[100],
            }}
          >
            Đến:
          </Typography.Text>
          <Select
            mode="multiple"
            style={{
              minWidth: 320,
              color: colors.secondary[100],
            }}
            allowClear
            bordered={false}
            size="large"
            suffixIcon={null}
            placeholder="Nhập tên"
            className="text-base"
            ref={refSelectHeader}
            onFocus={() => setNewToggleUserChat(!newToggleUserChat)}
            onChange={(e) => setNameUser(e)}
          >
            {optionsSelectChat.map((option, i) => (
              <Option value={option.name} label={option.name} key={i}>
                <Space>
                  <AvatarFriend
                    src={option.avatar}
                    online={option.active ? true : false}
                  />
                  <Space direction="vertical" style={{ gap: 0 }}>
                    <Typography className="font-bold">{option.name}</Typography>
                  </Space>
                </Space>
              </Option>
            ))}
          </Select>
        </Space>
      )}
    </Space>
  );
};

export default HeaderChatBox;
