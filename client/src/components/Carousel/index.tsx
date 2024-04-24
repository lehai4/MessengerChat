import { User } from "@/interface";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { SvgIcon } from "@mui/material";
import { Button, Typography } from "antd";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import AvatarFriend from "../Avatar";

const { Paragraph } = Typography;

type IndexProps = {
  colors: any;
  peopleOnOffLine: User[];
  showModal: () => void;
  handleSelectedUser: (user: User) => void;
};
const CarouselOver = ({
  colors,
  peopleOnOffLine,
  showModal,
  handleSelectedUser,
}: IndexProps) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      partialVisibilityGutter: 40,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: { max: 768, min: 464 },
      items: 1,
      partialVisibilityGutter: 30,
    },
  };
  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      ssr={true}
      autoPlaySpeed={1000}
      centerMode={false}
      draggable
      focusOnSelect={false}
      infinite
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      autoPlay={true}
      swipeable={true}
      partialVisible={false}
      dotListClass="custom-dot-list-style"
      responsive={responsive}
    >
      <div className="flex flex-col text-center items-center justify-between gap-2">
        <Button
          icon={
            <SvgIcon
              component={VideoCallIcon}
              style={{ color: colors.secondary[100] }}
            />
          }
          shape="circle"
          size="large"
          onClick={showModal}
          style={{
            display: "flex",
            boxSizing: "border-box",
            alignItems: "center",
            justifyContent: "center",
            background: colors.primary[100],
          }}
        />
        <Typography.Text style={{ color: colors.secondary[100] }}>
          Bắt đầu cuộc gọi
        </Typography.Text>
      </div>
      {peopleOnOffLine.map((_, i) => (
        <div
          className="flex flex-col text-center items-center justify-center gap-2"
          key={i}
          onClick={() => handleSelectedUser(_)}
        >
          <AvatarFriend src={_.avatar} online={_.active ? true : false} />
          <Paragraph
            ellipsis={{ rows: 2 }}
            className="text-sm"
            style={{ color: colors.secondary[100] }}
          >
            {_.name}
          </Paragraph>
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselOver;
