import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Collapse,
  Toolbar,
  AppBar,
  IconButton,
  Avatar,
  Drawer,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CategoryIcon from "@mui/icons-material/Category";
import GroupIcon from "@mui/icons-material/Group";
import AddIcon from "@mui/icons-material/Add";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ViewListIcon from "@mui/icons-material/ViewList";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid"; // 📞 Better icon for "Phone Directory"

import Logo from "../logo/Logo";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { routes } from "../../routes/routes";
import { Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeUserToken } from "../../services/userService";
import { toggleAuthAction } from "../../redux/actions/userActions";

const drawerWidth = 340;

export default function Sidebar() {
  const { t } = useTranslation();
  const [openItems, setOpenItems] = React.useState({});
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const dispatch = useDispatch();
  const fontSize = "16px";

  const handleLogout = () => {
    removeUserToken();
    dispatch(toggleAuthAction());
  };

  const handleToggleItem = (segment) => {
    setOpenItems((prev) => ({
      ...prev,
      [segment]: !prev[segment],
    }));
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const { value: user } = useSelector((state) => state.user);

  const navItems = [
    {
      segment: "dashboard",
      titleKey: "Dashboard",
      icon: <DashboardIcon />,
      path: routes.dashboardRoute,
    },
    { kind: "divider" },
    {
      segment: "users",
      titleKey: "users",
      icon: <CategoryIcon />,
      children: [
        {
          segment: "viewUsers",
          titleKey: "viewUsers",
          icon: <ViewListIcon />,
          path: routes.viewuserss,
        },
      ],
    },
    {
      segment: "categories",
      titleKey: "categories",
      icon: <CategoryIcon />,
      children: [
        {
          segment: "addCategory",
          titleKey: "add categories",
          icon: <AddIcon />,
          path: routes.addCategory,
        },
        {
          segment: "viewCategories",
          titleKey: "view categories",
          icon: <ViewListIcon />,
          path: routes.viewCategories,
        },
      ],
    },
    {
      segment: "sponsors",
      titleKey: "sponsors",
      icon: <GroupIcon />,
      children: [
        {
          segment: "addSponsor",
          titleKey: "add_sponsors",
          icon: <AddIcon />,
          path: routes.addSponsor,
        },
        {
          segment: "viewSponsors",
          titleKey: "view_sponsors",
          icon: <ViewListIcon />,
          path: routes.viewSponsors,
        },
      ],
    },
    {
      segment: "p_dir",
      titleKey: "p_dir",
      icon: <PhoneAndroidIcon />, // Changed icon here
      children: [
        {
          segment: "a_p_dir",
          titleKey: "a_p_dir",
          icon: <AddIcon />,
          path: routes.addDirectory,
        },
        {
          segment: "v_p_dir",
          titleKey: "v_p_dir",
          icon: <ViewListIcon />,
          path: routes.viewDirectorys,
        },
      ],
    },
    {
      segment: "logout",
      titleKey: "logout",
      icon: <LogoutIcon />,
      onClick: handleLogout,
    },
  ];

  const renderNavItems = (items, depth = 0) =>
    items.map((item, index) => {
      if (item.kind === "divider") {
        return <Divider key={`divider-${index}`} sx={{ my: 1 }} />;
      }

      if (item.children) {
        const isOpen = openItems[item.segment] || false;
        return (
          <Box key={item.segment}>
            <ListItem
              onClick={() => handleToggleItem(item.segment)}
              sx={{ pl: 2 + depth * 4, cursor: "pointer", my: 0.8 }}
            >
              <ListItemIcon sx={{ color: "var(--dark-blue)", minWidth: 32 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={t(item.titleKey)}
                primaryTypographyProps={{
                  sx: { fontSize, color: "initial" },
                }}
              />
              {isOpen ? (
                <ExpandLess sx={{ color: "initial" }} />
              ) : (
                <ExpandMore sx={{ color: "initial" }} />
              )}
            </ListItem>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {renderNavItems(item.children, depth + 1)}
              </List>
            </Collapse>
          </Box>
        );
      }

      const listItemProps = {
        sx: { pl: 2 + depth * 4, cursor: "pointer", my: 0.8 },
        onClick: () => {
          setDrawerOpen(false);
          if (item.onClick) item.onClick();
        },
      };

      return (
        <ListItem
          key={item.segment}
          {...listItemProps}
          component={item.path ? Link : "div"}
          to={item.path || undefined}
        >
          <ListItemIcon sx={{ color: "var(--dark-blue)", minWidth: 32 }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText
            primary={t(item.titleKey)}
            primaryTypographyProps={{
              sx: { fontSize, color: "initial" },
            }}
          />
        </ListItem>
      );
    });

  return (
    <Row>
      <AppBar
        position="relative"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          left: "0",
          px: 2,
          background: !drawerOpen
            ? "linear-gradient(to bottom, var(--blue-gray) 70%, rgba(255, 255, 255, 0.5))"
            : "var(--white)",
        }}
        elevation={0}
      >
        <Toolbar
          sx={{
            p: 0,
            minHeight: "64px",
            display: "flex",
            justifyContent: "space-between",
            color: "white",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              edge="start"
              onClick={toggleDrawer}
              sx={{ mr: 2, color: "var(--dark-blue)" }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ color: "white" }}
            >
              <Logo style={{ height: "50px", width: "50px" }} />
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "default",
              color: "white",
            }}
          >
            <Avatar sx={{ backgroundColor: "var(--light-blue)" }}>
              {user?.name?.[0]}
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            mt: "80px",
            maxHeight: "87vh !important",
            overflowY: "auto", // ✅ makes drawer scrollable
            overflowX: "hidden",
          },
        }}
      >
        <List sx={{ width: drawerWidth }}>{renderNavItems(navItems)}</List>
      </Drawer>
    </Row>
  );
}
