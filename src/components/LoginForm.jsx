import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { styled } from "@mui/material";
import { TextField, FormControl, Button } from "@mui/material";

const LoginWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  border: 1px solid #c1c2c3;
  height: auto;
  border-radius: 4px;
  padding: 16px;
  width: 400px;
`;

export const LoginForm = ({ onAuthSubmit }) => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    onAuthSubmit({
      email: username,
      password
    });
  };

  return (
    <LoginWrapper>
      <h3>Please Log In</h3>
      <form onSubmit={handleSubmit}>
        <FormControl sx={{ width: "100%", mb: 1 }}>
          <TextField
            label="Username"
            variant="outlined"
            type="text"
            onChange={(e) => setUserName(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ width: "100%", mb: 1 }}>
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ width: "100%", mb: 1 }}>
          <Button type="submit" variant="outlined">
            Login
          </Button>
        </FormControl>
      </form>
    </LoginWrapper>
  );
};
LoginForm.propTypes = {
  onAuthSubmit: PropTypes.func.isRequired
};
