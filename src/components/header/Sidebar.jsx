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
  Menu,
  MenuItem,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CategoryIcon from "@mui/icons-material/Category";
import GroupIcon from "@mui/icons-material/Group";
import AddIcon from "@mui/icons-material/Add";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ViewListIcon from "@mui/icons-material/ViewList";
import Logo from "../logo/Logo";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { routes } from "../../routes/routes";
import { Row } from "react-bootstrap";

const drawerWidth = 340;

const navItems = [
  {
    segment: "dashboard",
    titleKey: "Dashboard",
    icon: <DashboardIcon />,
    path: routes.dashboardRoute,
  },
  {
    kind: "divider",
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
        titleKey: "add sponsors",
        icon: <AddIcon />,
        path: routes.addSponsor,
      },
      {
        segment: "viewSponsors",
        titleKey: "view sponsors",
        icon: <ViewListIcon />,
        path: routes.viewSponsors,
      },
    ],
  },
];

export default function Sidebar() {
  const { t } = useTranslation();
  const [openItems, setOpenItems] = React.useState({});
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const fontSize = "16px";

  const handleToggleItem = (segment) => {
    setOpenItems((prev) => ({
      ...prev,
      [segment]: !prev[segment],
    }));
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    console.log("Logout clicked");
  };

  const handleProfile = () => {
    handleMenuClose();
    console.log("Profile clicked");
  };

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
              button="true"
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

      return (
        <ListItem
          key={item.segment}
          component={Link}
          to={item.path || "#"}
          sx={{ pl: 2 + depth * 4, cursor: "pointer", my: 0.8 }}
          onClick={() => setDrawerOpen(false)}
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
        position="sticky"
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
            onClick={handleAvatarClick}
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              color: "white",
            }}
          >
            <Avatar
              alt="User Avatar"
              src="/static/images/avatar/1.jpg"
              sx={{ backgroundColor: "var(--light-blue)" }}
            />
            <ArrowDropDownIcon sx={{ color: "var(--dark-blue)" }} />
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            sx={{ marginTop: "10px" }}
          >
            <MenuItem onClick={handleProfile}>{t("profile")}</MenuItem>
            <MenuItem onClick={handleLogout}>{t("logout")}</MenuItem>
          </Menu>
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
          },
        }}
      >
        <List sx={{ width: drawerWidth }}>{renderNavItems(navItems)}</List>
      </Drawer>
    </Row>
  );
}
