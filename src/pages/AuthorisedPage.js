import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUserData } from "../fetchers/getUserData";
import { setCurrentUser, setToken } from "../store/slice/auth";

export const AuthorisedPage = ({ children }) => {
  const { token, currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserData(token)
      .then((data) => {
        dispatch(setCurrentUser(data.users[0]));
      })
      .catch(() => {
        const y = confirm("Your token is invalid to login");
        if (y) {
          dispatch(setToken(null))
        }
      });
  }, [token, dispatch]);

  if (token && !currentUser) {
    return <CircularProgress />;
  }

  if (token && currentUser) {
    return children;
  }

  return <Navigate to="/login" />;
};
