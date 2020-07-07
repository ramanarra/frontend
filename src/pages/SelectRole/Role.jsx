import React from "react";
import classNames from "classnames";
import { Box, Typography } from "@material-ui/core";

import useStyles from "./useStyles";
import Centralize from "../../components/Centralize";
import ActiveTickSvg from "../../assets/img/right.svg";

function Role({ option, icon, text, handleSelect, isSelected }) {
  const classes = useStyles();

  return (
    <Box marginX={5}>
      <Centralize
        className={classes.slectRole}
        style={{ color: isSelected ? "#0bb5ff" : "#d8d8d8" }}
        onClick={() => handleSelect(option)}
      >
        {isSelected && (
          <div className={classes.activeTick}>
            <img
              className={classes.activeTickImg}
              src={ActiveTickSvg}
              alt="tick"
            />
          </div>
        )}
        <i
          style={{ borderColor: isSelected ? "#0bb5ff" : "#d8d8d8" }}
          className={classNames(icon, classes.btnImg)}
        ></i>
      </Centralize>
      <Typography
        className={classes.imgText}
        style={{ color: isSelected ? "#0bb5ff" : "#d8d8d8" }}
        variant="h1"
      >
        {text}
      </Typography>
    </Box>
  );
}

export default Role;
