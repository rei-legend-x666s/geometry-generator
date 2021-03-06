import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#243354",
      light: "#8C94AC",
      dark: "#162036",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#E13D4E",
      contrastText: "#d1713d",
    },
    text: {
      primary: "#243354",
      secondary: "#4d4d4d",
    },
    background: {
      default: "#edf0f2",
      paper: "#fff",
    },
    divider: "#A4A6B3",
  },
});

// export const darkTheme = createTheme({
//   palette: {
//     primary: {
//       main: "#243354",
//       light: "#8C94AC",
//       dark: "#162036",
//       contrastText: "#FFF",
//     },
//     secondary: {
//       main: "#E13D4E",
//       contrastText: "#d1713d",
//     },
//     text: {
//       primary: "#FFF",
//       secondary: "#edf0f2",
//     },
//     background: {
//       default: "#162036",
//       paper: "#243354",
//     },
//     divider: "#A4A6B3",
//   },
// });

export const drawerWidth = 240;
