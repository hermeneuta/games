//Query data based on purpose

import { MultiSelectItem } from "@tremor/react";

//
const Purpose = ({ name }) => {
  return (
    <MultiSelectItem className="bg-white" value={name}>
      {name}
    </MultiSelectItem>
  );
};

export default Purpose;
