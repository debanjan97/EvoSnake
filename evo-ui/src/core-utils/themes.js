import { createMuiTheme } from "@material-ui/core/styles";
import {purple, green, red, brown, } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
      primary: brown,
      secondary: green
    },
    status: {
      danger: 'orange',
    },
  });

  export default theme;