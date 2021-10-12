import { Menu } from "@mui/icons-material";
import {
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  IconButton,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { drawerWidth } from "../../styles/theme";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface TopAppBarProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

const TopAppBar = ({ open, handleDrawerOpen }: TopAppBarProps) => {
  return (
    <AppBar position="absolute" open={open}>
      <Toolbar sx={{ paddingRight: 24 }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerOpen}
          sx={{
            marginRight: 4,
            ...(open && { display: "none" }),
          }}
        >
          <Menu />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Geometry Generator
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopAppBar;
