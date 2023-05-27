import React, { useEffect } from "react";
import {
  TextField,
  FormControl,
  Autocomplete,
  IconButton,
  Button,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserAssign,
  setUsers,
  updateInfoItemsSelected,
} from "../store/assignStock/assignStockSlice";
import { getUsers, updateStockSerializable } from "../store/assignStock/assignStockThunk";

const AssignStock = () => {
  const dispatch = useDispatch();
  const { stockItemsSelected, users } = useSelector(
    (state) => state.assignStock
  );

  const handleChangeAutoComplete = (e, newValue) => {
    dispatch(setUserAssign(newValue))
  }

  useEffect(() => {
    const usersInStorage = JSON.parse(sessionStorage.getItem("users"));
    if (Object.keys(usersInStorage).length > 0)
      dispatch(setUsers(usersInStorage));
    else dispatch(getUsers());
  }, [dispatch]);

  return (
    <section className="_assignStock-container">
      Asignar Inventario
      <Autocomplete
        id="combo-box-demo"
        options={users}
        sx={{ width: "60%", marginTop: "10px" }}
        onChange={(e, nV) => handleChangeAutoComplete(e, nV)}
        renderInput={(params) => <TextField {...params} label="Usuario" />}
      />
      {stockItemsSelected.map((item, idx) => (
        <RowForm key={idx} data={item} />
      ))}
      <Button
        onClick={() => dispatch(updateStockSerializable())}
        variant="contained"
        endIcon={<SendIcon />}>
        Guardar Asignación
      </Button>
    </section>
  );
};

export default AssignStock;

const RowForm = ({ data }) => {
  const dispatch = useDispatch();

  const handleInputChange = (e, currentData) => {
    dispatch(
      updateInfoItemsSelected({
        ...currentData,
        confirmationSerial: e.target.value,
      })
    );
  };
  return (
    <FormControl className="_assignStock-form-row" sx={{ marginTop: "20px" }}>
      <TextField
        sx={{ width: "38%" }}
        id="outlined-read-only-input-equipo"
        label="Equipo"
        defaultValue={data.nombre}
        variant="filled"
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        sx={{ width: "27%" }}
        id="outlined-read-only-input-serial"
        label="Serial"
        defaultValue={data.serial}
        variant="filled"
        InputProps={{
          readOnly: true,
        }}
      />
      <div style={{ position: "relative", width: "27%" }}>
        <TextField
          error={data.serial !== data.confirmationSerial}
          sx={{ width: "100%" }}
          autoComplete="off"
          id="user-autocomplete"
          label="Confirmar serial"
          type="text"
          onChange={(e) => handleInputChange(e, data)}
        />
      </div>
      <IconButton color="primary">
        <ClearIcon />
      </IconButton>
    </FormControl>
  );
};
