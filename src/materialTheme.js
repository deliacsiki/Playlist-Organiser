import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: ['"Montserrat"'].join(","),
  },
  palette: {
    primary: {
      main: "#25283D",
      dark: "#3E4365",
    },
    secondary: {
      main: "#0582CA",
      light: "#00A6FB",
    },
  },
});

export default theme;
