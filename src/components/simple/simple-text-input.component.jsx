import { Box, TextInput, Tip } from "grommet";
import React from "react";

const SimpleTextInput = ({ title }) => {
  const [value, setValue] = React.useState("");
  const [isValid, setIsValid] = React.useState("");

  const handleValidation = () => {
    if (value.length === 0) return null;
    !isNaN(value) && !isNaN(parseFloat(value)) && value >= 50 && value <= 200
      ? setIsValid("")
      : setIsValid("notValid");
  };

  const onChange = (event) => {
    let number = event.target.value;

    if (title === "Рост, см") {
      setValue(number);
    } else if (title === "Вес, кг") {
      setValue(number);
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
          onChange={onChange}
          className={isValid}
          onBlur={handleValidation}
        />
      </Box>
      {isValid === "notValid" && (
       <p>Not Valid</p>
      )}
    </Box>
  );
};

export default SimpleTextInput;
