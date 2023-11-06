import { tokens } from "@/Context/theme";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { logOut } from "@/redux/api/apiRequest";
import { SettingOutlined } from "@ant-design/icons";
import { useTheme } from "@mui/material";
import { Avatar, Popover, Space, Tooltip } from "antd";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModalSetting } from "..";

const Setting = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const dataUser = useAppSelector((state) => state.auth.login?.currentUser);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [mode, setMode] = useState<string>(
    JSON.parse(localStorage.getItem("theme") as any)
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isOpenId, setIsOpenId] = useState<number | undefined>(0);
  const [isModalOpenChill, setIsModalOpenChill] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChangeSwitch = () => {};

  const handleClick = (id: number | undefined) => {
    setIsOpenId(id);
  };
  const handleLogOut = async () => {
    await logOut(dispatch, navigate);
    window.location.reload();
  };

  return (
    <Fragment>
      <Tooltip
        title="Menu trang cá nhân"
        mouseEnterDelay={0.5}
        color={mode === "dark" ? colors.grey[100] : ""}
      >
        <Popover
          trigger="click"
          content={
            <Space
              direction="horizontal"
              className="items-center justify-start cursor-pointer"
              style={{
                width: 250,
                color: colors.secondary[100],
              }}
              onClick={showModal}
            >
              <SettingOutlined />
              Tùy chọn
            </Space>
          }
          color={colors.primary[200]}
        >
          <Avatar
            size="large"
            src={dataUser?.user?.avatar}
            className="absolute bottom-5 left-1/2 -translate-x-1/2 border-0 p-0 cursor-pointer"
            onClick={() => {}}
          />
        </Popover>
      </Tooltip>
      <ModalSetting
        mode={mode}
        colors={colors}
        isOpenId={isOpenId}
        isModalOpen={isModalOpen}
        isModalOpenChill={isModalOpenChill}
        setMode={setMode}
        handleOk={handleOk}
        handleClick={handleClick}
        handleLogOut={handleLogOut}
        handleCancel={handleCancel}
        handleChangeSwitch={handleChangeSwitch}
        setIsModalOpenChill={setIsModalOpenChill}
      />
    </Fragment>
  );
};

export default Setting;
