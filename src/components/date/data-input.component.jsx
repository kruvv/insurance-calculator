import { Box, DateInput } from "grommet";
import React from "react";

const DateInputField = ({ title }) => {
  const [value, setValue] = React.useState();
  const onChange = (event) => {
    const nextValue = event.value;
    console.log("onChange", nextValue);
    setValue(nextValue);
  };
  return (
    <Box fill align="center" justify="center" pad="xxsmall" direction="row">
      <Box width="small" align="center">{title}</Box>
      <Box width="small" gap="medium">
        <DateInput format="dd/mm/yyyy" value={value} onChange={onChange} />
      </Box>
    </Box>
  );
};

export default DateInputField;
