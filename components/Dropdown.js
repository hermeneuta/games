import { Select, SelectItem } from "@tremor/react";

const Dropdown = ({ categoryName, value, onChange, catRange }) => {
  return (
    <div className="text-left">
      <label className="font-bold text-sm">{categoryName}</label>
      <Select value={value} onValueChange={onChange} className="mt-1">
        {catRange.map((catItem) => (
          <SelectItem value={catItem} key={catItem}>
            {catItem}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default Dropdown;
