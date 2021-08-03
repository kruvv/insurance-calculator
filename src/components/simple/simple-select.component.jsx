import { Box, Select } from "grommet";
import React, { useState } from "react";

const SimpleSelect = ({title}) => {
  const options = ["Мужской", "Женский"];
  const [value, setValue] = useState("");
  return (
    <Box fill align="center" justify="center" pad="xxsmall"  direction="row">
      <Box width="small" align="center">{title}</Box>
      <Box width="small">
        <Select
          id="select"
          name="select"
          placeholder="Укажите пол"
          value={value}
          options={options}
          onChange={({ option }) => setValue(option)}
        />
      </Box>
    </Box>
  );
};

export default SimpleSelect;
