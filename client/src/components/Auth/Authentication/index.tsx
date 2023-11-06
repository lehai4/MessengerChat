import { useAppDispatch } from "@/hooks/hooks";
import { signInUser } from "@/redux/api/apiRequest";
import resizeFile from "@/utils/resizeImage";
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Image,
  Input,
  Space,
  Typography,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { Content } from "antd/es/layout/layout";
import Link from "antd/es/typography/Link";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
type FieldType = {
  phone?: string;
  password?: string;
  name?: string;
  avatar?: string;
  active?: boolean;
};

const Authentication = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [label, setLabel] = useState<string>("Login");
  const [file, setFile] = useState<UploadFile | any>();
  const [imageUser, setImageUser] = useState<any>("");

  const onFinish = async (values: any) => {
    if (label === "Login") {
      await signInUser(values, dispatch, navigate);
    } else if (label === "Register") {
      let data = {
        ...values,
        avatar: imageUser,
      };
      try {
        await axios({
          method: "POST",
          url: "/auth/register",
          data,
        });
        setLabel("Login");
        toast.success("Register successfully!");
      } catch (e) {
        toast.error("Register failed!");
      }
    }
  };

  const handleChangeFile = async (e: any) => {
    try {
      const resizeFIle = await resizeFile(e.file, 25, 25, 10);
      // console.log(resizeFIle);
      setImageUser(resizeFIle);
    } catch (err) {
      console.log(err);
    }
  };
  const props: UploadProps = {
    onRemove: () => {
      setFile(null);
      setImageUser("");
    },
    beforeUpload: (file) => {
      setFile(file);
      return false;
    },
  };
  return (
    <Content className="max-h-screen m-auto">
      <div
        style={{
          margin: "0 auto",
          transform: "translate(-50%,-50%)",
          top: "50%",
          position: "absolute",
          left: "50%",
        }}
      >
        <Space className="flex flex-col justify-center items-center">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              fill="none"
              viewBox="0 0 48 48"
              id="messenger"
            >
              <path
                fill="url(#paint0_radial_147648_891)"
                d="M23.9979 0C10.4811 0 0 9.90512 0 23.2779C0 30.2733 2.86775 36.3208 7.53533 40.4964C7.9253 40.8444 8.16528 41.3363 8.17728 41.8643L8.30926 46.1359C8.35126 47.4978 9.75514 48.3857 11.003 47.8338L15.7666 45.7339C16.1686 45.554 16.6245 45.524 17.0505 45.638C19.2403 46.2379 21.5681 46.5619 23.9979 46.5619C37.5147 46.5619 47.9957 36.6568 47.9957 23.2839C47.9957 9.91112 37.5147 0 23.9979 0Z"
              ></path>
              <path
                fill="#fff"
                d="M9.58715 30.0873L16.6365 18.9043C17.7584 17.1225 20.1582 16.6845 21.8441 17.9444L27.4536 22.15C27.9695 22.534 28.6775 22.534 29.1874 22.144L36.7587 16.3965C37.7667 15.6286 39.0865 16.8405 38.4146 17.9144L31.3592 29.0914C30.2373 30.8732 27.8375 31.3112 26.1517 30.0513L20.5422 25.8457C20.0262 25.4617 19.3183 25.4617 18.8083 25.8517L11.237 31.5992C10.2291 32.3671 8.90921 31.1612 9.58715 30.0873Z"
              ></path>
              <defs>
                <radialGradient
                  id="paint0_radial_147648_891"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientTransform="matrix(52.2962 0 0 52.2961 9.24 47.734)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#09F"></stop>
                  <stop offset=".61" stop-color="#A033FF"></stop>
                  <stop offset=".935" stop-color="#FF5280"></stop>
                  <stop offset="1" stop-color="#FF7061"></stop>
                </radialGradient>
              </defs>
            </svg>
          </span>
          <Typography.Text strong className="mt-8 block text-3xl">
            Chào mừng bạn đến với Messenger
          </Typography.Text>
          <Typography.Text className="block text-lg">
            Cách đơn giản để nhắn tin, gọi điện và chat video ngay trên máy tính
          </Typography.Text>
        </Space>
        <Form
          name="login"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className="mt-24"
        >
          {label === "Login" ? (
            <>
              <Form.Item<FieldType>
                label="Phone"
                name="phone"
                rules={[
                  { required: true },
                  { whitespace: true },
                  { message: "Please input your phone!" },
                ]}
              >
                <Input size="large" />
              </Form.Item>

              <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[
                  { required: true },
                  {
                    message: "Please input your password",
                  },
                ]}
              >
                <Input.Password size="large" />
              </Form.Item>
              <Form.Item className="flex justify-end ">
                <Link onClick={() => setLabel("Register")}>
                  Bạn chưa có tài khoản?
                </Link>
              </Form.Item>
              <Form.Item className="flex justify-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-blue-500"
                >
                  Login
                </Button>
              </Form.Item>
            </>
          ) : (
            <>
              <Form.Item<FieldType>
                label="Phone"
                name="phone"
                rules={[
                  { required: true },
                  { whitespace: true },
                  { message: "Please input your phone!" },
                ]}
              >
                <Input size="large" />
              </Form.Item>

              <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[
                  { required: true },
                  {
                    message: "Please input your password",
                  },
                ]}
              >
                <Input.Password size="large" />
              </Form.Item>

              <Form.Item<FieldType>
                label="Name"
                name="name"
                rules={[
                  { required: true },
                  {
                    message: "Please input your name",
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>

              <Form.Item<FieldType> label="Avatar" name="avatar">
                <Upload
                  {...props}
                  onChange={handleChangeFile}
                  accept=".jpg, .png, .jpeg"
                >
                  <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
                {file && imageUser && <Image src={imageUser} />}
              </Form.Item>

              <Form.Item className="flex justify-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-blue-500"
                >
                  Register
                </Button>
              </Form.Item>
            </>
          )}
        </Form>
      </div>
    </Content>
  );
};

export default Authentication;
