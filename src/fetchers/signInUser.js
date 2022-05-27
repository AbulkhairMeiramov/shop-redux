import axios from "axios";

export function signInUser({ email, password }) {
  return axios
    .post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCztXsvQrH4cYdjvUVYiOA9npTQ1mDG2d8",
      {
        returnSecureToken: true,
        email,
        password
      }
    )
    .then((res) => res.data)
    .catch((err) => {
      if (err.response.data.error.message === "INVALID_PASSWORD") {
        throw new Error("Неверный пароль!");
      }
      if (err.response.data.error.message === "EMAIL_NOT_FOUND") {
        throw new Error("Данная почта не зарегистрирована!");
      }
      throw err;
    });
}
