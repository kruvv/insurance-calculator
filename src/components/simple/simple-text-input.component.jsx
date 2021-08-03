import { Box, TextInput} from "grommet";
import React, { useState, useEffect } from "react";

const SimpleTextInput = ({ title, onChange, evalue }) => {

  const [value, setValue] = useState(evalue === undefined ? "" : evalue);
  const [isValid, setIsValid] = useState("");

  useEffect(() => {
    setValue(evalue)
  },[evalue])

  // const handleValidation = () => {
  //   if (value.length === 0) return null;
  //   !isNaN(value) && !isNaN(parseFloat(value)) && value >= 50 && value <= 200
  //     ? setIsValid("")
  //     : setIsValid("notValid");
  // };

  const handleChange = (event) => {
    let number = event.target.value;

      setValue(number);

    if (onChange) {
      onChange(event, title, number);
    }
  };

  return (
    <Box fill align="center" justify="center" pad="xxsmall" direction="row">
      <Box width="small" align="center">
        {title}
      </Box>

      <Box width="small">
        <TextInput
          value={value}
          onChange={handleChange}
          className={isValid}
          // onBlur={handleValidation}
        />
      </Box>
      {isValid === "notValid" && <p>Not Valid</p>}
    </Box>
  );
};

export default SimpleTextInput;
