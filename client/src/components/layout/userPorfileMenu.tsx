"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import {
  useGetUserProfileQuery,
  useLogoutMutation,
} from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { API_URL } from "../../../shared/constants";

export default function UserProfileMenu() {
  const { push } = useRouter();
  const { data, isLoading } = useGetUserProfileQuery();
  const [logout] = useLogoutMutation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutUser = () => {
    logout()
      .unwrap()
      .then(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('canvasUrl')
        toast.success('You logged out!')
        push("/auth");
      })
      .catch(() => {
        push("/auth");
      });
  };

  return (
    <>
      {isLoading ? (
        ""
      ) : (
        <React.Fragment>
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar
                  src={data?.profileLogo !== null ? `${API_URL}${data?.profileLogo}` : ""}
                  sx={{ width: 42, height: 42 }}
                >
                  {data?.username[0]}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={() => push("/main/profile/settings")}>
              <Avatar
                src={data?.profileLogo !== null ? `${API_URL}${data?.profileLogo}` : ""}
                sx={{ width: 42, height: 42 }}
              >
                {data?.username[0]}
              </Avatar>{" "}
              {data?.username}
            </MenuItem>
            <MenuItem onClick={() => logoutUser()}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </>
  );
}
