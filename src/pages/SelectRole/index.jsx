import React from "react";
import { Box, makeStyles } from "@material-ui/core";

import Centralize from "../../components/Centralize";
import LogoWhite from "../../assets/img/logo-white.svg";
import BG from "../../assets/img/bg.png";

const useStyles = makeStyles(() => ({
  container: {
    height: "100vh",
    width: "100vw",
    cursor: 'pointer',
  },

  right: {
    width: "100%",
    backgroundImage: `url(${BG})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },

  logo: {
    width: 300,
  },
}))

function SelectRole({ history }) {
  const classes = useStyles();


  function handleOnClick() {
    localStorage.setItem('loginUser', 'patient')
    history.push("/login")
  }

  return (
    <Box className={classes.container} display="flex" onClick={handleOnClick}>
      <Centralize className={classes.right}>
        <img src={LogoWhite} alt="VIRUJH" className={classes.logo} />
      </Centralize>
    </Box>
  );
}

export default SelectRole;
