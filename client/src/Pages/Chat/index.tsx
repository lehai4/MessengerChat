import { tokens } from "@/Context/theme";
import {
  HeaderChatBox,
  HeaderUser,
  ModalActionCall,
  ModalStartCall,
} from "@/components";
import AvatarFriend from "@/components/Avatar";
import CarouselOver from "@/components/Carousel";
import { useAppSelector } from "@/hooks/hooks";
import { User } from "@/interface";
import {
  AudioFilled,
  FileFilled,
  LikeFilled,
  PlusCircleFilled,
} from "@ant-design/icons";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import CloseIcon from "@mui/icons-material/Close";
import {
  default as EmojiEmotionsIcon,
  default as SvgIcon,
} from "@mui/icons-material/EmojiEmotions";
import PersonIcon from "@mui/icons-material/Person";
import { useTheme } from "@mui/material";
import {
  Avatar,
  Button,
  Image,
  Input,
  InputRef,
  Popover,
  RadioChangeEvent,
  Space,
  Spin,
  Tooltip,
  Typography,
} from "antd";
import axios from "axios";
import Picker from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
const { Paragraph } = Typography;
type Options = {
  label: string;
  value: string;
};

const Chat = () => {
  const dataUser = useAppSelector((state) => state?.auth?.login?.currentUser);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const mode = theme.palette.mode;

  const divUnderMessages = useRef<HTMLDivElement>(null);
  const inputRefMessage = useRef<InputRef>(null);
  const [socket, setSocket] = useState<any>();
  const [option, setOption] = useState<string>("");

  const [valueSearch, setValueSearch] = useState<string>("");
  const [nameUser, setNameUser] = useState<string[]>([]);
  const [userResearchChat, setUserResearchChat] = useState<User[]>([]);
  const [prepareChat, setPrepareChat] = useState<boolean>(false);
  const [collectionChat, setCollectionChat] = useState<any[]>([]);
  const [optionsSelectChat, setOptionsSelectChat] = useState<Options[]>([]);

  const [peopleOnline, setPeopleOnline] = useState<User[]>([]);
  const [peopleOffline, setPeopleOffline] = useState<User[]>([]);
  const [peopleOnOffLine, setPeopleOnOffLine] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>();
  const [newMessageText, setNewMessageText] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);
  const [messagesAll, setMessagesAll] = useState<any[]>([]);

  const [radio, setRadio] = useState<string>("Bất kỳ ai có liên kết");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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
  const handleOption = (opt: string) => {
    setOption(opt);
    setIsModalOpen(false);
    setIsModalOpenChill(true);
  };
  const handleOpenReplayModal = () => {
    setIsModalOpenChill(false);
    setIsModalOpen(true);
  };
  const handleChange = (e: RadioChangeEvent) => {
    const { value } = e.target;
    setRadio(value);
  };
  const handleTexting = () => {
    let format = [...peopleOnOffCarousel];

    if (prepareChat) {
      setOptionsSelectChat(optionsSelectChat);
    } else {
      setOptionsSelectChat((prev: any) => {
        return [...prev, ...format];
      });
    }
    setPrepareChat(true);
    setSelectedUser({});
  };
  const handleSearch = async () => {
    if (valueSearch === "") {
      toast.info("Vui lòng nhập user bạn muốn tìm!!");
      return;
    }
    try {
      const result: any = await axios({
        method: "GET",
        url: `/users/${
          valueSearch ? `getUserByName/${valueSearch}` : `getAllUser`
        }`,
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
          withCredentials: true,
          token: `Bearer ${dataUser?.accessToken}`,
        },
      });
      if (result.data.length > 0) {
        const resSearch: any = peopleOnOffCarousel.filter((people) => {
          return result.data.find((data: any) => {
            return data._id === people._id;
          });
        });

        setUserResearchChat(resSearch);
      } else {
        setUserResearchChat([]);
      }
    } catch (err) {
      console.error("error", err);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.code === "Enter" && handleSearch();
  };
  const handleSelectedUser = (user: User) => {
    setSelectedUser(user);
    setPrepareChat(false);
    setUserResearchChat([]);
    setValueSearch("");
  };

  const showOnlinePeople = async (peopleArray: any[]) => {
    //Filter userId sameple
    const uniqueIds: any[] = [];
    const unique: any[] = peopleArray.filter((element) => {
      const isDuplicate = uniqueIds.includes(element.userData._id);

      if (!isDuplicate) {
        uniqueIds.push(element.userData._id);
        return true;
      }
      return false;
    });
    // check Id of User != userId of User Current Login
    let result = unique.filter((c) => {
      if (c.userData._id !== dataUser?.user?._id) {
        return c;
      }
    });
    let allUser = await axios({
      method: "GET",
      url: `/users/getAllUser`,
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
        withCredentials: true,
        token: `Bearer ${dataUser?.accessToken}`,
      },
    });

    const offline: User[] = allUser.data
      .filter((c: any) => c._id !== dataUser?.user?._id)
      .filter((p: any) => !result.map((op) => op.userData._id).includes(p._id));

    setPeopleOffline(offline);
    setPeopleOnline(
      result.map((online) => {
        return {
          ...online.userData,
          active: true,
        };
      })
    );
    await getAllCollectionChat();
  };
  const sendMessage = async (e: any, file: any = null) => {
    if (e) e.preventDefault();
    socket.emit(
      "sendMessage",
      JSON.stringify({
        recipient: selectedUser?._id,
        sender: dataUser?.user?._id,
        text: newMessageText,
        file,
      })
    );
    if (file) {
      await axios({
        url: "/messages/message/" + `${selectedUser?._id}`,
        headers: {
          token: `Bearer ${dataUser?.accessToken}`,
        },
      })
        .then((res) => {
          setMessages(res.data);
        })
        .catch(() => {
          setMessages([]);
        });
    } else {
      setNewMessageText("");
      setMessages((prev) => [
        ...prev,
        {
          text: newMessageText,
          sender: dataUser?.user?._id,
          recipient: selectedUser?._id,
          _id: Date.now(),
        },
      ]);
    }
  };
  const sendFile = (e: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      sendMessage(null, {
        name: e.target.files[0].name,
        data: reader.result,
      });
    };
  };
  const sendIcon = () => {
    toast.warning("Xin lỗi chức năng này không thể dùng!");
  };
  const onEmojiClick = (emojiObject: any) => {
    setNewMessageText((prevInput) => prevInput + emojiObject.emoji);
  };
  const getAllCollectionChat = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: "/messages/getAllMessage",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
          withCredentials: true,
        },
      });
      setMessagesAll(res.data);
    } catch (err) {
      toast.error(`${err}`);
    }
  };

  // concat On&Off
  const peopleOnOffCarousel = peopleOnline.concat(peopleOffline);
  // call api when user click button username
  useEffect(() => {
    if (selectedUser) {
      (async function getMessagesById() {
        await axios({
          url: "/messages/message/" + `${selectedUser?._id}`,
          headers: {
            token: `Bearer ${dataUser?.accessToken}`,
          },
        })
          .then((res) => {
            setMessages(res.data);
          })
          .catch(() => {
            toast.warning(`No messages with user ${selectedUser.name}`);
            setMessages([]);
          });
      })();
    }
  }, [selectedUser]);

  useEffect(() => {
    const div = divUnderMessages.current;
    if (div) {
      div?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  useEffect(() => {
    // check user send mess
    const compareWithIdYour = messagesAll.filter((data: any) => {
      return data.sender === dataUser?.user?._id;
    });

    // filter Data Same
    const uniqueIds: any[] = [];
    const unique: any[] = compareWithIdYour.filter((element: any) => {
      const isDuplicate = uniqueIds.includes(element.recipient);

      if (!isDuplicate) {
        uniqueIds.push(element.recipient);
        return true;
      }
      return false;
    });

    // check id of User === id User receive for Show Chat Collection
    let result = peopleOnOffLine.filter((object1) => {
      return unique.some((object2) => {
        return object1._id === object2.recipient;
      });
    });
    setCollectionChat(result);
  }, [messagesAll]);

  //concat if state peopleOnline or peopleOffline change
  useEffect(() => {
    const concatArr = peopleOnline.concat(peopleOffline);
    setPeopleOnOffLine(concatArr);
  }, [peopleOnline, peopleOffline]);

  useEffect(() => {
    socket?.emit("addUser", dataUser?.user);
    socket?.on("getUsers", (users: any[]) => {
      showOnlinePeople(users);
    });
  }, [dataUser?.user]);
  useEffect(() => {
    setSocket(io("ws://localhost:8000"));
  }, []);

  return (
    <React.Fragment>
      <div
        style={{
          width: 270,
          flex: "0 0 270px",
          maxWidth: "270px",
          minWidth: "270px",
          borderRight:
            mode === "light"
              ? "0.1px solid rgb(233 230 230)"
              : `0.1px solid ${colors.grey[100]}`,
          background: colors.primary[100],
          color: colors.secondary[100],
        }}
      >
        <HeaderUser
          title="Chat"
          mode={mode}
          colors={colors}
          valueSearch={valueSearch}
          setValueSearch={setValueSearch}
          handleKeyDown={handleKeyDown}
          handleTexting={handleTexting}
        />
        <div className="mt-6 overflow-auto h-full">
          {userResearchChat.length > 0 ? (
            <Space
              direction="vertical"
              className="flex flex-col cursor-pointer"
              style={{ columnGap: 10 }}
            >
              {userResearchChat.map((_, i) => (
                <Space
                  direction="vertical"
                  className="flex flex-row items-center px-3"
                  key={i}
                  onClick={() => handleSelectedUser(_)}
                >
                  <AvatarFriend
                    src={_.avatar}
                    online={_.active ? true : false}
                  />

                  <Space direction="vertical" style={{ gap: 0 }}>
                    <Typography
                      className="font-bold"
                      style={{
                        color: colors.secondary[100],
                      }}
                    >
                      {_.name}
                    </Typography>
                  </Space>
                </Space>
              ))}
            </Space>
          ) : userResearchChat.length === 0 && valueSearch !== "" ? (
            <Typography.Text className="px-[20px] text-red-500">
              Không có user!
            </Typography.Text>
          ) : (
            <>
              <div className="px-3">
                <CarouselOver
                  colors={colors}
                  peopleOnOffLine={peopleOnOffCarousel}
                  showModal={showModal}
                  handleSelectedUser={handleSelectedUser}
                />
              </div>
              {/* collection Messages */}
              {prepareChat && (
                <div className="w-full">
                  <div
                    className="py-4 px-3 w-full flex flex-row items-center justify-between"
                    style={{
                      background: colors.grey[100],
                    }}
                  >
                    <div className="w-full inline-flex flex-row items-center gap-1.5">
                      <Button
                        icon={<SvgIcon component={PersonIcon} />}
                        shape="circle"
                        size="large"
                        style={{
                          color: colors.secondary[100],
                          background: colors.primary[100],
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      />
                      {nameUser.length > 0 ? (
                        <Paragraph
                          ellipsis={{
                            rows: 1,
                          }}
                          strong
                          style={{
                            maxWidth: 150,
                            color: colors.secondary[100],
                          }}
                        >
                          Chat với
                          {nameUser.map((_) => {
                            return <>{` ${_}`}</>;
                          })}
                        </Paragraph>
                      ) : (
                        <Typography.Text
                          strong
                          style={{ color: colors.secondary[100] }}
                        >
                          Tin nhắn mới
                        </Typography.Text>
                      )}
                      {/* </Typography.Text> */}
                    </div>
                    <CloseIcon
                      style={{
                        fontSize: 20,
                        border: `1px solid ${colors.primary[200]}`,
                        borderRadius: "50%",
                        color: colors.secondary[100],
                      }}
                      onClick={() => setPrepareChat(false)}
                    />
                  </div>
                </div>
              )}
              <div className="mt-3">
                {collectionChat.length === 0 ? (
                  <div className="text-center py-1 bg-gray-100">
                    <Spin size="large" />
                    <Typography.Text type="secondary">
                      Không có đoạn chat nào!
                    </Typography.Text>
                  </div>
                ) : (
                  collectionChat.map((user, i) => (
                    <div
                      key={i}
                      className={`cursor-pointer h-full flex py-2`}
                      style={{
                        background:
                          selectedUser?._id === user?._id && mode === "dark"
                            ? colors.grey[100]
                            : selectedUser?._id === user?._id &&
                              mode === "light"
                            ? colors.grey[100]
                            : "",
                      }}
                      onClick={() => handleSelectedUser(user)}
                    >
                      <div className="mx-2 inline-flex flex-row items-center justify-between gap-2 h-full">
                        <AvatarFriend src={user.avatar} online={user.active} />
                        <span style={{ fontSize: 15, fontWeight: 650 }}>
                          {user.name}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
      {/* Content Chat */}
      <div
        className="flex-1 w-full relative"
        style={{
          background: colors.primary[100],
          color: colors.secondary[100],
        }}
      >
        <HeaderChatBox
          mode={mode}
          colors={colors}
          nameUser={nameUser}
          prepareChat={prepareChat}
          selectedUser={selectedUser}
          optionsSelectChat={optionsSelectChat}
          setNameUser={setNameUser}
        />

        {/* Khung chat */}
        <div
          className="overflow-auto"
          style={{ height: "calc(100% - 63px - 52px)" }}
        >
          {messages.length > 0 ? (
            <>
              <Space
                align="center"
                direction="vertical"
                className="flex justify-center pt-10"
              >
                <Avatar src={selectedUser.avatar} size={72} />
                <Typography.Text
                  className="text-sm font-bold"
                  style={{
                    color: colors.secondary[100],
                  }}
                >
                  {selectedUser.name}
                </Typography.Text>
                <Typography.Text
                  type="secondary"
                  style={{
                    color: colors.secondary[100],
                  }}
                >
                  Facebook
                </Typography.Text>
                <Typography.Text
                  type="secondary"
                  style={{
                    color: colors.secondary[100],
                  }}
                >
                  Các bạn là bạn bè trên Facebook
                </Typography.Text>
                <Button
                  className="border-0 shadow-none rounded-full bg-gray-100"
                  onClick={() =>
                    toast.warning("Xin lỗi chức năng này không thể dùng!!")
                  }
                >
                  <Typography.Text className="font-bold text-sm">
                    Xem trang cá nhân
                  </Typography.Text>
                </Button>
              </Space>
              {messages.map((mes) => (
                <div
                  className={`flex ${
                    mes.sender === dataUser?.user?._id ? "flex-row-reverse" : ""
                  }`}
                  key={mes._id}
                >
                  <div
                    className={`text-left inline-block rounded-3xl ml-5 mr-10 p-2 my-2 ${
                      mes.sender === dataUser?.user?._id && mode === "light"
                        ? "bg-blue-500 text-white"
                        : mes.sender === dataUser?.user?._id && mode === "dark"
                        ? "bg-blue-500 text-white"
                        : mes.sender !== dataUser?.user?._id && mode === "dark"
                        ? "bg-gray-500 text-white"
                        : "bg-gray-200"
                    }`}
                    style={{ maxWidth: "80%" }}
                  >
                    {mes.text}
                    {mes.file && (
                      <a
                        href={axios.defaults.baseURL + "/uploads/" + mes.file}
                        className="flex flex-row items-center underline"
                        style={
                          mes.sender === dataUser?.user?._id
                            ? { color: "white" }
                            : { color: "black" }
                        }
                        target="_blank"
                      >
                        <AttachFileOutlinedIcon style={{ fontSize: 15 }} />
                        {mes.file}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </>
          ) : selectedUser ? (
            <Space
              align="center"
              direction="vertical"
              className="flex justify-center pt-10"
            >
              <Avatar src={selectedUser.avatar} size={72} />
              <Typography.Text
                className="text-sm font-bold"
                style={{
                  color: colors.secondary[100],
                }}
              >
                {selectedUser.name}
              </Typography.Text>
              <Typography.Text
                type="secondary"
                style={{
                  color: colors.secondary[100],
                }}
              >
                Facebook
              </Typography.Text>
              <Typography.Text
                type="secondary"
                style={{
                  color: colors.secondary[100],
                }}
              >
                Các bạn là bạn bè trên Facebook
              </Typography.Text>
              <Button
                className="border-0 shadow-none rounded-full bg-gray-100"
                onClick={() =>
                  toast.warning("Xin lỗi chức năng này không thể dùng!!")
                }
              >
                <Typography.Text className="font-bold text-sm">
                  Xem trang cá nhân
                </Typography.Text>
              </Button>
              <Typography.Text
                className="italic py-[20px]"
                type="secondary"
                style={{
                  color: colors.secondary[100],
                }}
              >
                Hãy bắt đầu cuộc trò chuyện
              </Typography.Text>
            </Space>
          ) : (
            <div className="flex flex-col items-center h-full justify-center pt-10">
              <Typography.Text
                className="text-[20px] italic"
                type="secondary"
                style={{
                  color: colors.secondary[100],
                }}
              >
                Không có cuộc trò chuyện.
              </Typography.Text>
              <Image
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmlQR7p4vLeqcPENcKy0XS2XM0Jz5rfwe1C0DiwoHOu2qa8K7yltuerTVS5Hq4Dy7XLqY&usqp=CAU"
                }
                width={100}
                height={100}
                preview={false}
              />
              <Typography.Text
                className="text-[20px] italic"
                type="secondary"
                style={{
                  color: colors.secondary[100],
                }}
              >
                Hãy chọn người trò chuyện
              </Typography.Text>
            </div>
          )}

          <div ref={divUnderMessages}></div>
        </div>
        {/* tool chat */}
        {selectedUser && (
          <div className="absolute bottom-0 w-full px-4 py-3">
            <form
              className="flex flex-row items-center gap-3"
              onSubmit={sendMessage}
            >
              <Tooltip
                title="Thêm file phương tiện"
                mouseEnterDelay={1}
                color={mode === "dark" ? colors.grey[100] : ""}
              >
                <Popover
                  trigger="click"
                  placement="topLeft"
                  content={
                    <div className="flex flex-col">
                      <div className="flex flex-row items-center gap-4 my-[5px] hover:bg-gray-100 w-full">
                        <AudioFilled style={{ fontSize: 15 }} />
                        <Typography.Text className="w-max">
                          Thu clip âm thanh
                        </Typography.Text>
                      </div>
                      <div className="flex flex-row items-center gap-4 my-[5px] hover:bg-gray-100 w-full">
                        <AttachFileOutlinedIcon style={{ fontSize: 15 }} />
                        <Input
                          type="file"
                          className="hidden"
                          id="file"
                          accept=".png, .jpg, .jpeg, .docx, .pdf, .pptx"
                          onChange={sendFile}
                        />
                        <label htmlFor="file">Thêm file đính kèm</label>
                      </div>
                    </div>
                  }
                >
                  <Button
                    icon={
                      <PlusCircleFilled
                        className="text-blue-500 hover:text-blue-900"
                        style={{ fontSize: 18 }}
                      />
                    }
                    style={{
                      border: "none",
                      boxShadow: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  />
                </Popover>
              </Tooltip>

              <Input
                placeholder="Nhập tin nhắn..."
                size="large"
                bordered={false}
                className="target:bottom-0"
                value={newMessageText}
                onChange={(e) => setNewMessageText(e.target.value)}
                ref={inputRefMessage}
                style={{
                  borderRadius: 20,
                  background:
                    mode === "light" ? colors?.secondary[300] : "white",
                }}
                suffix={
                  <Space align="center" style={{ columnGap: 15 }}>
                    <Tooltip
                      title="Gửi nhãn dán(Ctrl+S), gửi file GIF(Ctr+G) hoặc gửi ảnh(Ctrl+P)"
                      color={mode === "dark" ? colors.grey[100] : ""}
                    >
                      <FileFilled
                        className="text-blue-500"
                        onClick={() =>
                          toast.warning(
                            "Xin lỗi chức năng gửi sticker không sử dụng được!"
                          )
                        }
                      />
                    </Tooltip>
                    <Tooltip
                      title="Gửi biểu tượng cảm xúc(Ctrl+E)"
                      mouseEnterDelay={0.5}
                      color={mode === "dark" ? colors.grey[100] : ""}
                    >
                      <Popover
                        trigger="click"
                        content={
                          <Picker onEmojiClick={(e) => onEmojiClick(e)} />
                        }
                      >
                        <EmojiEmotionsIcon className="text-blue-500" />
                      </Popover>
                    </Tooltip>
                  </Space>
                }
              />
              <Tooltip
                title="Gửi icon"
                mouseEnterDelay={0.5}
                color={mode === "dark" ? colors.grey[100] : ""}
              >
                <Button
                  onClick={sendIcon}
                  icon={
                    <LikeFilled
                      className="text-blue-500 hover:text-blue-900"
                      style={{ fontSize: 18 }}
                    />
                  }
                  style={{
                    border: "none",
                    boxShadow: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              </Tooltip>
            </form>
          </div>
        )}
      </div>

      {/* Modals */}
      <ModalStartCall
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        handleOption={handleOption}
      />
      <ModalActionCall
        radio={radio}
        option={option}
        handleChange={handleChange}
        isModalOpenChill={isModalOpenChill}
        handleOpenReplayModal={handleOpenReplayModal}
      />
    </React.Fragment>
  );
};

export default Chat;
