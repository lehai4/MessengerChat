import { FormOutlined } from "@ant-design/icons";
import SearchIcon from "@mui/icons-material/Search";
import { Input, Tooltip, Typography } from "antd";
type PropsHeader = {
  title?: string;
  colors?: any;
  mode?: string;
  valueSearch: string;
  setValueSearch: (e: string) => void;
  handleTexting?: () => void;
  handleKeyDown?: (e: React.KeyboardEvent) => void;
};
const HeaderUser = ({
  title,
  colors,
  mode,
  valueSearch,
  setValueSearch,
  handleKeyDown,
  handleTexting,
}: PropsHeader) => {
  return (
    <div className="pt-8 px-3">
      <div className="flex items-center justify-between">
        <Typography.Text
          className="text-2xl font-bold"
          style={{ color: colors?.secondary[100] }}
        >
          {title}
        </Typography.Text>
        {title === "Chat" && (
          <Tooltip
            title="Soạn tin nhắn"
            mouseEnterDelay={0.5}
            placement="top"
            color={mode === "dark" && colors.grey[100]}
          >
            <FormOutlined style={{ fontSize: 20 }} onClick={handleTexting} />
          </Tooltip>
        )}
      </div>
      <Input
        className="mt-5 rounded-none"
        size="large"
        value={valueSearch}
        suffix={
          <SearchIcon
            style={{
              fontSize: 16,
            }}
          />
        }
        allowClear
        style={{
          background: colors?.secondary[300],
        }}
        placeholder="Tìm kiếm (Ctrl+K)"
        onKeyDown={handleKeyDown}
        onChange={(e) => setValueSearch(e.target.value)}
      />
    </div>
  );
};

export default HeaderUser;
