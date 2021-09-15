import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import Link from "next/link";
import clsx from "clsx";
import { ChevronLeft } from "@material-ui/icons";
import { useRouter } from "next/router";
import { useState } from "react";

import { drawerWidth } from "../../styles/theme";
import { MENU_LIST_ITEMS } from "../../constants/menu-items";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  list: {
    padding: 0,
  },

  selected: {
    backgroundColor: `${theme.palette.primary.light} !important`,
  },
  link: {
    textDecoration: "none",
  },
  linkText: {
    color: theme.palette.primary.light,
  },
  text: {
    ...theme.typography.h6,
  },
  linkTextSelected: {
    color: theme.palette.primary.contrastText,
  },
}));

interface SidebarProps {
  open: boolean;
  handleDrawerClose: () => void;
}

const Sidebar = ({ open, handleDrawerClose }: SidebarProps) => {
  const classes = useStyles();
  const router = useRouter();
  const initialSelection = MENU_LIST_ITEMS.findIndex(
    (e) => e.route === router.pathname
  );
  const [selectedIndex, setSelectIndex] = useState(
    initialSelection !== -1 ? initialSelection : 0
  );
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeft />
        </IconButton>
      </div>
      <Divider />
      <List classes={{ root: classes.list }}>
        {MENU_LIST_ITEMS.map(({ name, Icon, route }, id) => (
          <Link href={route} key={id}>
            <a className={classes.link}>
              <ListItem
                button
                selected={id === selectedIndex}
                onClick={() => setSelectIndex(id)}
                classes={{ selected: classes.selected }}
              >
                <ListItemIcon
                  classes={{
                    root:
                      id === selectedIndex
                        ? classes.linkTextSelected
                        : classes.linkText,
                  }}
                >
                  <Icon />
                </ListItemIcon>
                <ListItemText
                  primary={name}
                  primaryTypographyProps={{ variant: "subtitle1" }}
                  classes={{
                    root:
                      id === selectedIndex
                        ? classes.linkTextSelected
                        : classes.linkText,
                    primary: classes.text,
                  }}
                />
              </ListItem>
            </a>
          </Link>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
