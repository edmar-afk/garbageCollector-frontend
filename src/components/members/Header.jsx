import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Box,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LockIcon from "@mui/icons-material/Lock";
import HomeIcon from "@mui/icons-material/Home";
import logo from "../../assets/images/logo.jpg";
import { Link } from "react-router-dom";

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Button
                component={Link}
                to="/sb-dashboard"
                color="primary"
                startIcon={<HomeIcon />}
                sx={{ textTransform: "none" }}
              >
                Home
              </Button>
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        sx={{ backgroundColor: "white", color: "black", boxShadow: 3, mb: 3 }}
      >
        <Toolbar>
          {!isMobile && (
            <Box
              component="img"
              src={logo}
              alt="logo"
              sx={{ height: 40, mr: 2 }}
            />
          )}
          {isMobile && (
            <Box
              component="img"
              src={logo}
              alt="logo"
              sx={{ height: 36, mr: 2 }}
            />
          )}

          {!isMobile && (
            <Box sx={{ display: "flex", gap: 3 }}>
              <Button
                component={Link}
                to="/sb-dashboard"
                color="primary"
                startIcon={<HomeIcon />}
                sx={{ textTransform: "none" }}
              >
                Home
              </Button>
              <Button
                color="inherit"
                startIcon={<LockIcon />}
                sx={{ textTransform: "none" }}
              >
                Confidential Files
              </Button>
            </Box>
          )}

          <Box sx={{ flexGrow: 1 }} />

          <Button
            component={Link}
            to="/logout"
            variant="contained"
            color="error"
            sx={{
              textTransform: "none",
              px: 3,
            }}
          >
            Logout
          </Button>

          {isMobile && (
            <IconButton color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

export default Header;
