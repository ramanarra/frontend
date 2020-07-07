import { makeStyles } from "@material-ui/core/styles";

import BG from "../../assets/img/bg.png";

const useStyles = makeStyles(() => ({
  container: {
    height: "100vh",
    width: "100vw",
  },

  right: {
    width: "50%",
    backgroundImage: `url(${BG})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },

  logo: {
    width: 300,
  },

  left: {
    width: "50%",
    backgroundColor: "#fff",
  },

  text: {
    letterSpacing: 2,
    marginBottom: 40,
  },

  slectRole: {
    height: 160,
    width: 160,
    borderRadius: "50%",
    margin: 10,
    border: "2px solid",
    position: 'relative'
  },

  btnImg: {
    fontSize: 70,
  },

  imgText: {
    letterSpacing: 2,
    fontWeight: 500,
    textAlign: "center",
  },

  activeTick: {
    top: 7,
    right: 18,
    position: 'absolute',
  },

  activeTickImg: {
    height: 20,
    width: 'auto',
  }
}));

export default useStyles;
