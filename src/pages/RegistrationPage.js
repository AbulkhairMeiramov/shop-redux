import { RegistrationForm } from "../components/RegistrationForm";
import { useCallback } from "react";
import { signUpUser } from "../fetchers/signUpUser";
import { setToken } from "../store/slice/auth";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export const RegistrationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserCreated = useCallback(
    (user) => {
      signUpUser({ email: user.email, password: user.password })
        .then(({ idToken }) => {
          dispatch(setToken(idToken));
          navigate("/shop");
        })
        .catch((err) => {
          alert(err.message);
        });
    },
    [dispatch, navigate]
  );

  return (
    <div
      style={{
        marginTop: 10,
        display: "flex",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      <RegistrationForm onUserCreated={handleUserCreated} />
      <p>
        Already registered? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
};
