import VideoCallIcon from "@mui/icons-material/VideoCall";
import { SvgIcon } from "@mui/material";
import { Button, Typography } from "antd";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import AvatarFriend from "../Avatar";
import { User } from "@/interface";

const { Paragraph } = Typography;

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 4,
    slidesToSlide: 1, // optional, default to 1.
  },
};

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
  return (
    <Carousel
      responsive={responsive}
      transitionDuration={500}
      infinite
      swipeable={false}
      draggable={false}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      slidesToSlide={1}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
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
