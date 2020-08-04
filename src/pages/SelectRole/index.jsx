import React, { useState } from "react";
import { Box, Typography } from "@material-ui/core";

import Centralize from "../../components/Centralize";
import LogoWhite from "../../assets/img/logo-white.svg";
import Role from "./Role";
import useStyles from "./useStyles";

function SelectRole({ history }) {
  const [option, setOption] = useState("doctor");
  const classes = useStyles();

  function handleSelect(value) {
    if (option === value) {
      localStorage.setItem('loginUser', option)
      history.push("/login");
    } else {
      setOption(value);
    }
  }

  return (
    <Box className={classes.container} display="flex">
      <Centralize className={classes.right}>
        <img src={LogoWhite} alt="VIRUJH" className={classes.logo} />
      </Centralize>

      <Centralize className={classes.left} flexDirection="column">
        <Typography className={classes.text} variant="h1">
          SELECT YOUR ROLE
        </Typography>
        <Centralize>
          <Role
            isSelected={option === "doctor"}
            option="doctor"
            icon="icon-doctor"
            text="DOCTOR"
            handleSelect={handleSelect}
          />

          <Role
            isSelected={option === "patient"}
            option="patient"
            icon="icon-patient"
            text="PATIENT"
            handleSelect={handleSelect}
          />
        </Centralize>
      </Centralize>
    </Box>
  );
}

export default SelectRole;
