import React from "react";

import { Box, Button } from "grommet";

const BasicButton = (props) => (
  <Box align="center" pad="medium">
    <Button
      primary
      label={props.title}
      onClick={() => {}}
      {...props}
      disabled={props.disabled}
      size="large"
    />
  </Box>
);

export default BasicButton;
