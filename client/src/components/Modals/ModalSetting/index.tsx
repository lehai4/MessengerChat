import { settingData, settingDataTmp } from "@/mockAPI";
import { Button, Divider, Modal, Typography } from "antd";
import React from "react";
import { toast } from "react-toastify";
import {
  ActiveStatus,
  Language,
  Notification,
  Shared,
  Theme,
} from "./ModalChilldren";

type ModalProps = {
  colors: any;
  mode: string;
  isModalOpen: boolean;
  isModalOpenChill: boolean;
  isOpenId: number | undefined;
  handleOk: () => void;
  handleCancel: () => void;
  handleChangeSwitch: () => void;
  setMode: (mode: string) => void;
  handleLogOut: () => Promise<void>;
  setIsModalOpenChill: (data: boolean) => void;
  handleClick: (id: number | undefined) => void;
};

const ModalSetting = (props: ModalProps) => {
  const {
    mode,
    colors,
    isModalOpen,
    isOpenId,
    isModalOpenChill,
    setMode,
    handleOk,
    handleClick,
    handleCancel,
    setIsModalOpenChill,
    handleLogOut,
  } = props;
  return (
    <Modal
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      closeIcon={false}
      centered
      width={680}
      style={{ height: 580 }}
      footer={null}
      bodyStyle={{
        margin: "-20px -24px",
        border: mode === "dark" ? `0.1px solid ${colors.secondary[400]}` : "",
        background: colors.primary[200],
      }}
    >
      <div className="flex flex-row justify-between ">
        <div style={{ width: 302, height: 580, overflowY: "scroll" }}>
          <div className="flex flex-col">
            {settingData.map((set, i) => (
              <React.Fragment key={i}>
                {!set.disabled ? (
                  <div
                    className={`inline-flex flex-row items-center cursor-pointer h-14 p-3 ${
                      isOpenId === set?.id && mode === "dark"
                        ? "bg-stone-900"
                        : isOpenId === set?.id && mode === "light"
                        ? "bg-gray-200"
                        : ""
                    }`}
                    style={{ gap: 15 }}
                    onClick={() => handleClick(set.id)}
                  >
                    <Button
                      icon={
                        <set.icon
                          style={{
                            color:
                              mode === "dark" ? colors.secondary[100] : "white",
                          }}
                        />
                      }
                      shape="circle"
                      size="large"
                      style={{
                        background: set.bg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                    <Typography.Text
                      strong
                      style={{ fontSize: 17, color: colors.secondary[100] }}
                    >
                      {set.content}
                    </Typography.Text>
                  </div>
                ) : (
                  <Typography.Text
                    type="secondary"
                    className="p-3 block h-8"
                    style={{ color: colors.secondary[100] }}
                  >
                    {set.title}
                  </Typography.Text>
                )}
              </React.Fragment>
            ))}
            {settingDataTmp.map((item, i) => (
              <div
                className={`inline-flex flex-row items-center cursor-pointer h-14 p-3`}
                style={{ gap: 15 }}
                key={i}
                onClick={() => {
                  if (item.id === 8) {
                    setIsModalOpenChill(true);
                  } else {
                    toast.warning("Chức năng chưa thể sử dụng!");
                  }
                }}
              >
                <Button
                  icon={<item.icon style={{ color: "white" }} />}
                  shape="circle"
                  size="large"
                  style={{
                    background: item.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
                <Typography.Text
                  strong
                  style={{ fontSize: 17, color: colors.secondary[100] }}
                >
                  {item.content}
                </Typography.Text>
              </div>
            ))}
          </div>
        </div>
        <Divider
          type="vertical"
          style={{
            height: 580,
            marginInline: 5,
            background: colors.primary[100],
          }}
        />
        <div className="flex flex-col flex-1 pl-5 pr-5 pt-16">
          {isOpenId === 0 ? (
            <Shared />
          ) : isOpenId === 1 ? (
            <ActiveStatus />
          ) : isOpenId === 2 ? (
            <Notification />
          ) : isOpenId === 3 ? (
            <Theme mode={mode} setMode={setMode} />
          ) : isOpenId === 4 ? (
            <Language />
          ) : (
            <></>
          )}
        </div>
        <Modal
          open={isModalOpenChill}
          onOk={() => setIsModalOpenChill(true)}
          onCancel={() => setIsModalOpenChill(false)}
          closeIcon={false}
          width={450}
          centered
          footer={(_) => (
            <div className="flex item-center flex-row ">
              <Button
                type="primary"
                className="bg-blue-500 w-full"
                onClick={handleLogOut}
              >
                Đăng xuất
              </Button>
              <Button
                onClick={() => setIsModalOpenChill(false)}
                className="w-full"
              >
                Hủy
              </Button>
            </div>
          )}
        >
          <div className="pb-12">
            <Typography.Text className="text-lg font-bold">
              Bạn có chắc chắn muốn đăng xuất không?
            </Typography.Text>
          </div>
        </Modal>
      </div>
    </Modal>
  );
};

export default ModalSetting;
