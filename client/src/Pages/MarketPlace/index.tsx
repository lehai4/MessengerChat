import { tokens } from "@/Context/theme";
import HeaderUser from "@/components/Header/HeaderUser";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const MarketPlace = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const mode = theme.palette.mode;
  const [valueSearch, setValueSearch] = useState<string>("");

  useEffect(() => {
    setTimeout(() => {
      toast.info("Trang này tạm thời chưa sử dụng!!");
    }, 1000);
  }, []);
  return (
    <>
      <div
        style={{
          width: 270,
          flex: "0 0 270px",
          maxWidth: "270px",
          minWidth: "270px",
          height: "100%",
          borderRight:
            mode === "light"
              ? "0.1px solid rgb(233 230 230)"
              : `0.1px solid ${colors.grey[100]}`,
          background: colors.primary[100],
          color: colors.secondary[100],
        }}
      >
        <HeaderUser
          title={"Marketplace"}
          mode={mode}
          colors={colors}
          valueSearch={valueSearch}
          setValueSearch={setValueSearch}
        />
      </div>
      {/* Content Chat */}
      <div
        className="flex-1 w-full relative"
        style={{
          background: colors.primary[100],
          color: colors.secondary[100],
        }}
      ></div>
    </>
  );
};

export default MarketPlace;
