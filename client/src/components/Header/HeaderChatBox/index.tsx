import AvatarFriend from "@/components/Avatar";
import { EllipsisOutlined, CloseOutlined } from "@ant-design/icons";
import CallIcon from "@mui/icons-material/Call";
import SearchIcon from "@mui/icons-material/Search";
import VideocamIcon from "@mui/icons-material/Videocam";
import { SvgIcon } from "@mui/material";
import { Select, Space, Tooltip, Typography } from "antd";
import { toast } from "react-toastify";
const { Option } = Select;

type HeaderChatBoxProps = {
  selectedUser: any;
  nameUser: string[];
  mode: string;
  colors: any;
  prepareChat: boolean;
  optionsSelectChat: any[];
  setNameUser: (data: string[]) => void;
};
const HeaderChatBox = ({
  selectedUser,
  mode,
  nameUser,
  colors,
  prepareChat,
  optionsSelectChat,
  setNameUser,
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
                {selectedUser?.name ? selectedUser.name : "No name"}
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
            autoFocus
            allowClear
            defaultOpen
            size="large"
            mode="multiple"
            className="text-base"
            placeholder="Nhập tên"
            bordered={false}
            value={nameUser}
            suffixIcon={null}
            popupMatchSelectWidth={false}
            style={{
              minWidth: 100,
              color: colors.secondary[100],
            }}
            tagRender={(item) => {
              return (
                <div
                  className="ant-select-selection-item"
                  style={{
                    background: mode === "dark" ? "rgb(33,33,33)" : "",
                  }}
                >
                  <span
                    className="ant-select-selection-item-content"
                    style={{
                      color: mode === "dark" ? "white" : "black",
                    }}
                  >
                    {item.value}
                  </span>
                  <span className="ant-select-selection-item-remove">
                    <CloseOutlined
                      onClick={() => {
                        let result = [...nameUser].filter(
                          (c) => c !== item.value
                        );
                        setNameUser(result);
                      }}
                      style={{
                        color: mode === "dark" ? "white" : "black",
                      }}
                    />
                  </span>
                </div>
              );
            }}
            onChange={(e) => setNameUser(e)}
            filterOption={(input, option: any) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
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
