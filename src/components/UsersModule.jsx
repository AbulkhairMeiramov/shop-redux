import { styled } from "@mui/material";
import { RegistrationForm } from "./RegistrationForm";
import { LoginForm } from "./LoginForm";
import { useCallback } from "react";
import { signUpUser } from "../fetchers/signUpUser";
import { signInUser } from "../fetchers/signInUser";

const RegistrationFormStyled = styled(RegistrationForm)`
  margin-right: 30px;
`;
const Wrapper = styled("div")`
  display: flex;
`;
export const UsersModule = () => {
  const handleUserCreated = useCallback((user) => {
    signUpUser({ email: user.email, password: user.password })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  const handleAuthSubmit = useCallback((user) => {
    signInUser({ email: user.email, password: user.password })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  return (
    <Wrapper>
      <RegistrationFormStyled onUserCreated={handleUserCreated} />
      <LoginForm onAuthSubmit={handleAuthSubmit} />
    </Wrapper>
  );
};
