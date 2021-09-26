import { ChevronLeft } from "@mui/icons-material";
import {
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Toolbar,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { MENU_LIST_ITEMS } from "../../constants/menu-items";
import { drawerWidth } from "../../styles/theme";

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

interface SidebarProps {
  open: boolean;
  handleDrawerClose: () => void;
}

const Sidebar = ({ open, handleDrawerClose }: SidebarProps) => {
  const router = useRouter();
  const initialSelection = MENU_LIST_ITEMS.findIndex(
    (e) => e.route === router.pathname
  );
  const [selectedIndex, setSelectIndex] = useState(
    initialSelection !== -1 ? initialSelection : 0
  );
  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeft />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {MENU_LIST_ITEMS.map(({ name, Icon, route }, id) => (
          <Link href={route} key={id}>
            <a>
              <ListItemButton
                selected={id === selectedIndex}
                onClick={() => setSelectIndex(id)}
              >
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText
                  primary={name}
                  primaryTypographyProps={{ variant: "subtitle1" }}
                />
              </ListItemButton>
            </a>
          </Link>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
