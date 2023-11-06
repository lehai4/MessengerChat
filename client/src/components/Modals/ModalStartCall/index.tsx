import { modalData } from "@/mockAPI";
import { RightOutlined } from "@ant-design/icons";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { SvgIcon } from "@mui/material";
import { Button, Divider, List, Modal, Space, Typography } from "antd";
import Link from "antd/es/typography/Link";
import { toast } from "react-toastify";
type ModalProps = {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  handleOption: (opt: string) => void;
};

const ModalStartCall = (props: ModalProps) => {
  const { isModalOpen, handleOk, handleCancel, handleOption } = props;
  return (
    <Modal
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      closeIcon={false}
      centered
      width={425}
      footer={(_) => (
        <div className="flex item-center flex-row">
          <Button onClick={handleCancel} className="w-full">
            Đóng
          </Button>
          <Button
            type="primary"
            className="bg-blue-500 w-full"
            onClick={() => {
              toast.warning("Chức năng tạm thời đóng");
            }}
          >
            Bắt đầu cuộc gọi
          </Button>
        </div>
      )}
    >
      <Space direction="vertical">
        <div className="mb-5 flex flex-col items-center justify-center">
          <div className="h-16 w-16 mb-5 rounded-full relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <SvgIcon
              component={VideoCallIcon}
              sx={{ color: "white" }}
              className="absolute inset-2/4 -translate-y-1/2 -translate-x-1/2"
              fontSize="large"
            />
          </div>
          <Space direction="horizontal">
            <SvgIcon component={EmojiEmotionsIcon} sx={{ color: "#B4963C" }} />
            <Typography.Text className="text-lg font-bold">
              Cuộc gọi video của Hải
            </Typography.Text>
          </Space>
        </div>
        <List
          dataSource={modalData}
          renderItem={(item, index) => (
            <List.Item
              actions={
                item.name
                  ? [
                      <Button
                        icon={<RightOutlined />}
                        onClick={() => handleOption(item.name)}
                        style={{ border: "none", boxShadow: "none" }}
                      />,
                    ]
                  : []
              }
              key={index}
            >
              <List.Item.Meta
                className="w-72"
                title={
                  <Typography.Text className="font-bold text-base">
                    {item.name}
                  </Typography.Text>
                }
                description={
                  <Typography.Text className="font-normal text-normal">
                    {item.description}
                  </Typography.Text>
                }
              />
            </List.Item>
          )}
        />
        <Divider className="m-0" />
        <div className="font-normal leading-none">
          Mesenger bảo về quyền riêng tư của bạn.&nbsp;
          <Link
            href="https://www.facebook.com/help/messenger-app/428396601806860"
            target="_blank"
          >
            Tìm hiểu thêm
          </Link>
        </div>
        <div className="pb-4 font-normal leading-tight">
          Khi bạn tham gia cuộc gọi, những người có liên kết hoặc được mời(gồm
          cả những ai không phải là bạn bè của bạn trên Facebook) có thể nhìn
          thấy tên , ảnh đại diện của bạn và biết bạn đã có mặt.
        </div>
      </Space>
    </Modal>
  );
};

export default ModalStartCall;
