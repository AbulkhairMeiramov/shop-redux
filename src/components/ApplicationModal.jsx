import {
  styled,
  TextField,
  FormControl,
  Button,
  Modal,
  Box,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { required, validateTelephoneNum } from "../utils/validators";
import { getInputState } from "../utils/getInputState";
import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const StyledBox = styled(Box)`
  width: 400px;
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #acacac;
  box-shadow: 24px;
  padding: 8px;
  border-radius: 8px;
`;

export const ApplicationModal = (props) => {
  const { register, handleSubmit, formState, getValues } = useForm({
    defaultValues: JSON.parse(localStorage.getItem("user")) || {},
  });
  const dispatch = useDispatch();
  const { applicationOpened } = useSelector((state) => state.shop);

  const onSubmit = useCallback(() => {
    alert("Submitted");
  });

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCityName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <Modal {...props} open={applicationOpened}>
      <StyledBox>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Оформление заявки</h2>
          <FormControl sx={{ width: "100%", mb: 1 }}>
            <TextField
              label="Имя"
              variant="outlined"
              {...register("firstName", { required: required() })}
              {...getInputState(formState, "firstName")}
            />
          </FormControl>
          <FormControl sx={{ width: "100%", mb: 1 }}>
            <TextField
              label="Номер телефона"
              variant="outlined"
              {...register("telephoneNum", {
                required: required(),
                validate: validateTelephoneNum,
              })}
              {...getInputState(formState, "telephoneNum")}
            />
          </FormControl>
          <FormControl sx={{ width: "100%", mb: 1 }}>
            <TextField
              label="Эл. Почта"
              variant="outlined"
              type="email"
              {...register("email", { required: required() })}
              {...getInputState(formState, "email")}
            />
          </FormControl>
          <FormControl sx={{ width: "100%", mb: 1 }}>
            <InputLabel id="demo-simple-select-label">Город</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Город"
              onChange={handleChange}
            >
              <MenuItem value="Almaty">Алматы</MenuItem>
              <MenuItem value="Nur-Sultan">Нур-Султан</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: "30%", mb: 1 }}>
            <Button type="submit" variant="outlined">
              Отправить
            </Button>
          </FormControl>
        </form>
      </StyledBox>
    </Modal>
  );
};
