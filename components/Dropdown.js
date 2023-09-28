import { Select, SelectItem } from "@tremor/react";

const Dropdown = ({ categoryName, value, onChange, catRange }) => {
  return (
    <div className="text-left sm:text-center mr-14 ml-14 sm:mr-5 sm:ml-5">
      <label className="font-bold text-sm">{categoryName}</label>
      <Select value={value} onValueChange={onChange} className="p-1">
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
