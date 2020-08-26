import React from "react";
import { Box } from "@material-ui/core";

function Centralize({ children, ...rest }) {
  return (
    <Box alignItems="center" justifyContent="center" display="flex" {...rest}>
      {children}
    </Box>
  )
}

export default Centralize;
