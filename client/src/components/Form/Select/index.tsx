import { Select } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
type SelectedProps = {
  options: Option[];
  value: Option;
  size: SizeType;
  handleChange: (e: Option) => void;
};
const Selected = ({ options, size, value, handleChange }: SelectedProps) => {
  return (
    <Select
      value={value}
      size={size}
      onChange={handleChange}
      options={options}
    />
  );
};

export default Selected;
