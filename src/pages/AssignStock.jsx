import React, { useEffect, useState } from "react";
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
  deleteItemSelected,
  setUserAssign,
  setUsers,
  updateInfoItemsSelected,
} from "../store/assignStock/assignStockSlice";
import { getUsers, updateStockSerializable } from "../store/assignStock/assignStockThunk";
import Toast from "../components/Toast";

const AssignStock = () => {
  const dispatch = useDispatch();
  const { stockItemsSelected, users, userAssign } = useSelector(
    (state) => state.assignStock
  );
  const [enableAssign, setEnableAssign] = useState(false);

  const handleChangeAutoComplete = (e, newValue) => {
    dispatch(setUserAssign(newValue))
  }

  useEffect(() => {
    const usersInStorage = JSON.parse(sessionStorage.getItem("users"));
    if (usersInStorage)
      dispatch(setUsers(usersInStorage));
    else dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    let isValidItems = false;

    for (const item of stockItemsSelected) {
      isValidItems = ((item.serial === item.confirmationSerial ) || item.cantidad > 0)
      console.log(isValidItems)
      if (!isValidItems) break;
    }

    const isValidAssign = isValidItems && !!userAssign.id
    setEnableAssign(isValidAssign);
  }, [stockItemsSelected, userAssign, setEnableAssign])
  

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
      <Toast
        containerStyles={{ position: "relative", top: "-140px" }}
        alertStyles={{ justifyContent: "center", width: "60%", margin: "auto" }}
      />
      <Button
        disabled={!enableAssign}
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
  const handleInputChangeCantidad = (e, currentData) => {
    let value = e.target.value > currentData.cantidad || e.target.value <= 0 ? currentData.cantidad : e.target.value;
    dispatch(
      updateInfoItemsSelected({
        ...currentData,
        nuevaCantidad: value,
      })
    );
  };
  const deleteItem = (id) => {
    dispatch(deleteItemSelected({id}))
  }
  return (
    <FormControl className="_assignStock-form-row" sx={{ marginTop: "20px" }}>
      <TextField
        sx={{ width: "38%" }}
        id="outlined-read-only-input-equipo"
        label={!!data.serial ? 'Equipo' : 'Material'}
        defaultValue={data.nombre}
        variant="filled"
        InputProps={{
          readOnly: true,
        }}
      />
      {
        !!data.serial &&
      <TextField
        sx={{ width: "27%" }}
        id="outlined-read-only-input-serial"
        label={"Serial"}
        type={"text"}
        value={data.serial}
        variant="filled"
        InputProps={{
          readOnly: true,
        }}
      />
      }
      {
        !!data.cantidad &&
        <TextField
          sx={{ width: "27%" }}
          id="outlined-read-only-input-cantd"
          label={"Cantidad"}
          type={"number"}
          value={data.nuevaCantidad ?? data.cantidad}
          onChange={(e) => handleInputChangeCantidad(e,data)}
          InputProps={{
            inputProps: {
              max: data.cantidad,
              min: 1,
            }
          }}
        />

      }
      {
        !!data.serial &&
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
      }
      <IconButton 
        onClick={() => deleteItem(data.id)}
        color="primary"
        >
        <ClearIcon />
      </IconButton>
    </FormControl>
  );
};
