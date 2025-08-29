import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Toolbar,
  Box,
  Typography,
  Button,
  Divider,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SecurityIcon from "@mui/icons-material/Security";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import { useTheme } from "@mui/material/styles";
import RecentUploads from "./sidebar/RecentUploads";
import Storage from "./sidebar/Storage";
import logo from "../assets/images/logo.jpg";

const drawerWidth = 260;

function Sidebar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: (
        <DashboardIcon
          fontSize="large"
          sx={{
            bgcolor: "rgb(147,197,253)",
            color: "rgb(29,78,216)",
            p: 1,
            borderRadius: "50%",
          }}
        />
      ),
    },
    // {
    //   to: "/staffs",
    //   label: "Staffs",
    //   icon: (
    //     <PeopleAltIcon
    //       fontSize="large"
    //       sx={{
    //         bgcolor: "rgb(134,239,172)",
    //         color: "rgb(22,101,52)",
    //         p: 1,
    //         borderRadius: "50%",
    //       }}
    //     />
    //   ),
    // },
    {
      to: "/confidentials",
      label: "Confidential Files",
      icon: (
        <SecurityIcon
          fontSize="large"
          sx={{
            bgcolor: "rgb(216,180,254)",
            color: "rgb(107,33,168)",
            p: 1,
            borderRadius: "50%",
          }}
        />
      ),
    },
    {
      to: "/folders",
      label: "Folders",
      icon: (
        <FolderCopyIcon
          fontSize="large"
          sx={{
            bgcolor: "rgb(253,164,175)",
            color: "rgb(157,23,77)",
            p: 1,
            borderRadius: "50%",
          }}
        />
      ),
    },
    {
      to: "/archives",
      label: "Archives File",
      icon: (
        <RestoreFromTrashIcon
          fontSize="large"
          sx={{
            bgcolor: "rgb(254,215,170)",
            color: "rgb(154,52,18)",
            p: 1,
            borderRadius: "50%",
          }}
        />
      ),
    },
  ];

  const drawerContent = (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        "&::-webkit-scrollbar": { display: "none" },
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      <Toolbar sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box
          component="img"
          src={logo}
          sx={{ width: 48, height: 48, borderRadius: "50%" }}
          alt="logo"
        />
        <Typography variant="p" sx={{ fontWeight: 600 }}>
          eGovern Admin
        </Typography>
      </Toolbar>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {navItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={NavLink}
                to={item.to}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  "&.active": {
                    bgcolor: "rgba(0,0,0,0.04)",
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontWeight: 600, fontSize: 14 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Storage />
        <Link to="/logout" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            startIcon={<ExitToAppIcon fontSize="small" />}
            sx={{
              bgcolor: "#b91c1c",
              "&:hover": { bgcolor: "#7f1d1d" },
              borderRadius: 2,
              textTransform: "none",
              fontSize: 14,
              mt: 2,
            }}
            fullWidth
          >
            Logout
          </Button>
        </Link>
      </Box>
      <Box sx={{ mt: "auto" }}>
        <RecentUploads />
      </Box>
    </Box>
  );

  return (
    <>
      {isMobile && (
        <IconButton
          color="inherit"
          edge="start"
          onClick={() => setMobileOpen(!mobileOpen)}
          sx={{
            position: "fixed",
            top: 16,
            left: 16,
            zIndex: 1000,
            backgroundColor: "gray",
            color: "white",
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>
    </>
  );
}

export default Sidebar;
