import {
  styled,
  TextField,
  FormControl,
  Button,
  Modal,
  Box,
} from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { required } from "../utils/validators";
import { getInputState } from "../utils/getInputState";
import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";

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

export const ApplicationModal = () => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, formState, getValues } = useForm({
    defaultValues: JSON.parse(localStorage.getItem("user")) || {},
  });

  const handleClick = () => {
    setOpen(!open);
  };

  const onSubmit = useCallback(() => {
    alert("Submitted");
  });

  return (
    <Modal open={true}>
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
              type="number"
              {...register("telephoneNum", { required: required() })}
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
          <ListItemButton onClick={handleClick}>
            <ListItemText primary="Город" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Starred" />
              </ListItemButton>
            </List>
          </Collapse>
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
