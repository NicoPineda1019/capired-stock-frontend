import React from "react";
import TextField from "@mui/material/TextField";
import {
  Autocomplete,
  Button,
  Fab,
  FormControl,
  FormGroup,
  IconButton,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import UploadIcon from "@mui/icons-material/Upload";
import CheckIcon from "@mui/icons-material/Check";
import { green } from '@mui/material/colors';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemSerializableStock,
  deleteItemSerializableStock,
  updateItemSerializableStock,
} from "../store/uploadStock/uploadStock";
import { getMaterials, uploadStock } from "../store/uploadStock/uploadStockThunk";
import { openLoading } from "../store/loading/loadingSlice";

const options = [
  { label: "SWITCH DGS-105 5P 10/100/1000 DLIK", id: 1 },
  { label: "DECO 2", id: 1 },
];
const buttonSx = {
  ...({
    bgcolor: green[500],
    '&:hover': {
      bgcolor: green[700],
    },
  }),
};
const UploadStock = () => {
  const dispatch = useDispatch();

  const { serializableStock, checkLoading } = useSelector((state) => state.uploadStock);

  const handleKey = (e) => {
    if (!(e.target.tagName === "BODY")) return;
    dispatch(
      addItemSerializableStock([
        {
          serial: e.key,
        },
      ])
    );
  };
  useEffect(() => {
    dispatch(getMaterials())
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [dispatch]);

  return (
    <section className="_uploadStock-container">
      <h2>Cargar Inventario</h2>
      <FormGroup
        sx={{
          maxHeight: "80%",
          overflow: "auto",
          flexDirection: "row !important",
        }}
      >
        {serializableStock.map((element, idx) => (
          <RowForm data={element} postion={idx} key={idx} />
        ))}
      </FormGroup>
      <Button variant="contained" endIcon={<UploadIcon />} onClick={() => dispatch(uploadStock())}>
        Cargar
      </Button>
      {
        checkLoading &&
      <Fab
          color="primary"
          sx={buttonSx}
        >
          <CheckIcon />
        </Fab>

      }
    </section>
  );
};

export default UploadStock;

const RowForm = ({ data, postion }) => {
  const dispatch = useDispatch();
  const { materials } = useSelector((state) => state.uploadStock);

  const handleChange = (e, pos) => {
    dispatch(
      updateItemSerializableStock({
        ...data,
        idArray: pos,
        serial: e.target?.value,
      })
    );
  };
  const handleChangeAutoComplete = (e, newValue) => {
      dispatch(updateItemSerializableStock({
          ...data,
          id: newValue?.id
      }))
  }
  const deleteItem = (pos) => {
    dispatch(deleteItemSerializableStock(pos));
  };
  return (
    <FormControl className="_uploadStock-form-row">
      <div style={{ width: "30%" }}>
        <InputLabel htmlFor="component-outlined">Serial</InputLabel>
        <OutlinedInput
          id="component-outlined"
          label="Serial"
          onChange={(e) => handleChange(e, postion)}
          value={data.serial}
          sx={{ width: "100%" }}
        />
      </div>
      <Autocomplete
        id="combo-box-demo"
        options={materials}
        sx={{ width: "40%" }}
        onChange={handleChangeAutoComplete}
        renderInput={(params) => <TextField {...params} label="Equipo" />}
      />
      <IconButton
        color="primary"
        aria-label="add to shopping cart"
        onClick={() => deleteItem(postion)}
      >
        <ClearIcon />
      </IconButton>
    </FormControl>
  );
};
