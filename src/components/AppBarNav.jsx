import { Fragment, useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from '@mui/icons-material/Inbox';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import SummarizeIcon from '@mui/icons-material/Summarize';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import UploadIcon from '@mui/icons-material/Upload';
import LogoutIcon from '@mui/icons-material/Logout';
import { Auth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { ADMIN_ROLE, TECH_ROLE } from "../constants";

const techRoutes = [
  {
    label: "Inventario",
    path: "stock",
    icon: <InventoryOutlinedIcon/>
  },
  {
    label: "Bandeja de Entrada",
    path: "inbox",
    icon: <InboxIcon/>
  }
]
const adminRoutes = [
  {
    label: "Inventario",
    path: "stock",
    icon: <InventoryOutlinedIcon/>
  },
  {
    label: "Resumen Inventario",
    path: "summary",
    icon: <SummarizeIcon/>
  },
  {
    label: "Asignar Inventario",
    path: "assign",
    icon: <AssignmentIndIcon/>
  },
  {
    label: "Cargar Inventario",
    path: "upload",
    icon: <UploadIcon/>
  }
]
const AppBarNav = () => {
  const auth = useContext(Auth);
  const navigate = useNavigate()
  const closeSession = () => {
    auth?.cognitoUser?.globalSignOut({
      onSuccess: () => {
        console.log('Session Closed SuccessFully')
        window.location.reload()
      },
      onFailure: (e) => console.error(e)
    })
    
  }
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [routes, setRoutes] = useState([])
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  useEffect(() => {
    const role = sessionStorage.getItem("ROLE")
    if (role === ADMIN_ROLE) setRoutes(adminRoutes)
    if (role === TECH_ROLE) setRoutes(techRoutes)
  }, [])
  
  const list = (anchor) => (
    <section
      className="_sideBar-box"
      onClick={toggleDrawer(anchor, false)}
    >
      <List>
        {routes.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText sx={{ color: 'whitesmoke'}} primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <ListItemButton onClick={closeSession}>
        <ListItemIcon>
          <LogoutIcon/>
        </ListItemIcon>
        <ListItemText sx={{ color: 'whitesmoke'}} primary={"Cerrar Sesión"}></ListItemText>
      </ListItemButton>
    </section>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer('left', true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {auth.sesion?.idToken?.payload["name"]}
          </Typography>
        </Toolbar>
      </AppBar>
        <Fragment>
          <Drawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
          >
            {list('left')}
          </Drawer>
        </Fragment>
    </Box>
  );
};

export default AppBarNav;
