import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { stringAvatar } from "../utils/getAvatarString";
import { React, useState, useCallback, useEffect } from "react";
import { setRemoveToken } from "../store/slice/auth";
import { loadCategories } from "../store/actions/loadCategories";

const settings = ["Logout"];

export function Navbar({ title, rightContent, leftContent, ...rest }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const load = useCallback(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <AppBar position="sticky" {...rest}>
      <Toolbar>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        {leftContent}
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ flexGrow: 0 }} >
          <Tooltip title="Open settings">
            <div>
              {rightContent}
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <Avatar size="small" {...stringAvatar(currentUser.email)} />
              </IconButton>
            </div>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem
                key={setting}
                onClick={() => dispatch(setRemoveToken())}
              >
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
