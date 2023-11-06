import { iconAction, modalDataActionCall } from "@/mockAPI";
import { ArrowLeftOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  List,
  Modal,
  Radio,
  RadioChangeEvent,
  Space,
  Typography,
} from "antd";
import Link from "antd/es/typography/Link";
import { toast } from "react-toastify";

type ModalProps = {
  option: string;
  radio: string;
  isModalOpenChill: boolean;
  handleChange: (e: RadioChangeEvent) => void;
  handleOpenReplayModal: () => void;
};

const ModalActionCall = (props: ModalProps) => {
  const {
    option,
    radio,
    isModalOpenChill,
    handleChange,
    handleOpenReplayModal,
  } = props;
  return (
    <Modal
      open={isModalOpenChill}
      closeIcon={null}
      centered
      width={425}
      footer={
        option === "Hoạt động trong cuộc gọi"
          ? null
          : (_) => (
              <Button
                type="primary"
                className="bg-blue-500 w-full"
                onClick={() => {
                  toast.warning("Chức năng tạm thời đóng");
                }}
              >
                Xác nhận
              </Button>
            )
      }
      bodyStyle={
        option === "Hoạt động trong cuộc gọi" ? { margin: "-20px -24px" } : {}
      }
    >
      <Space direction="vertical" align="center">
        {option === "Hoạt động trong cuộc gọi" ? (
          <div className="h-full">
            <div
              className="flex items-center self-center px-5 z-10"
              style={{ height: 60 }}
            >
              <Button
                icon={<ArrowLeftOutlined />}
                style={{
                  border: "none",
                  boxShadow: "none",
                  fontWeight: "bold",
                }}
                onClick={handleOpenReplayModal}
              />
              <Typography.Text strong className="text-base ml-24">
                Chọn hoạt động
              </Typography.Text>
            </div>
            <div className="ant-row pt-6 pb-4 px-1 flex flex-row flex-wrap gap-y-6 text-center h-96 overflow-x-hidden overflow-y-scroll">
              {iconAction.map((item, i) => (
                <Col key={i} xl={6} md={6} sm={6} xs={6}>
                  <div className="flex flex-col justify-between items-center">
                    <Button
                      icon={item.icon}
                      className="bg-gray-100"
                      shape="circle"
                      size="large"
                      style={{
                        color: `${item.color}`,
                        borderColor: "#fff9f9",
                      }}
                      onClick={() => {
                        toast.warning("Chức năng tạm thời đóng");
                      }}
                    />
                    <Typography.Text className="mt-2 leading-tight">
                      {item.title}
                    </Typography.Text>
                  </div>
                </Col>
              ))}
            </div>
          </div>
        ) : (
          <Space direction="vertical" className="h-full ">
            <div>
              <Button
                icon={<ArrowLeftOutlined />}
                style={{
                  border: "none",
                  boxShadow: "none",
                  fontWeight: "bold",
                }}
                onClick={handleOpenReplayModal}
              />
              <Typography.Text strong className="text-base ml-24">
                Ai có thể tham gia?
              </Typography.Text>
            </div>
            <List
              dataSource={modalDataActionCall}
              renderItem={(item, index) => (
                <List.Item key={index}>
                  <Radio.Group onChange={handleChange} value={radio}>
                    <Radio value={item.name}>
                      <Typography.Text className="text-base font-normal">
                        {item.name}
                      </Typography.Text>
                    </Radio>
                  </Radio.Group>
                </List.Item>
              )}
            />
            <div className="pt-5 pb-36 font-normal leading-none">
              Chỉ những người mà bạn phê duyệt mới có thể tham gia cuộc gọi,
              ngay cả khi họ không dùng Facebook hay Messenger.&nbsp;
              <Link
                href="https://www.facebook.com/help/messenger-app/428396601806860"
                target="_blank"
              >
                Tìm hiểu thêm
              </Link>
            </div>
          </Space>
        )}
      </Space>
    </Modal>
  );
};

export default ModalActionCall;
