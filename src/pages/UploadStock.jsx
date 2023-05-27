import React, { useCallback } from "react";
import TextField from "@mui/material/TextField";
import {
  Autocomplete,
  Box,
  Button,
  Fab,
  FormControl,
  FormGroup,
  IconButton,
  InputLabel,
  OutlinedInput,
  Tab,
  Tabs,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import UploadIcon from "@mui/icons-material/Upload";
import CheckIcon from "@mui/icons-material/Check";
import { green } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemNoSerializableStock,
  addItemSerializableStock,
  deleteItemNoSerializableStock,
  deleteItemSerializableStock,
  setCategory,
  setItemNoSerializableStock,
  setItemSerializableStock,
  updateItemSerializableStock,
} from "../store/uploadStock/uploadStock";
import {
  getMaterials,
  uploadStock,
} from "../store/uploadStock/uploadStockThunk";
import { openLoading } from "../store/loading/loadingSlice";
import TabContext from "@mui/lab/TabContext/TabContext";
import TabList from "@mui/lab/TabList/TabList";

const options = [
  { label: "SWITCH DGS-105 5P 10/100/1000 DLIK", id: 1 },
  { label: "DECO 2", id: 1 },
];
const buttonSx = {
  ...{
    bgcolor: green[500],
    "&:hover": {
      bgcolor: green[700],
    },
  },
};
const UploadStock = () => {
  const dispatch = useDispatch();

  const { serializableStock, noSerializableStock, checkLoading, category } =
    useSelector((state) => state.uploadStock);

  /*   const handleKey = (e) => {
    if (!(e.target.tagName === "BODY")) return;
    dispatch(
      addItemSerializableStock([
        {
          serial: e.key,
        },
      ])
    );
  }; */
  const handleKey = useCallback(
    (e) => {
      console.log(category);
      if (!(e.target.tagName === "BODY" && category === "1")) return;
      dispatch(
        addItemSerializableStock([
          {
            serial: e.key,
          },
        ])
      );
    },
    [dispatch, category]
  );

  const handleTab = (e, newValue) => {
    dispatch(setCategory(newValue));
  };

  const addItemNoSerializable = () => {
    dispatch(addItemSerializableStock([{
      cantidad: 0
    }]))

  }

  useEffect(() => {
    // dispatch(getMaterials())
    document.addEventListener("keydown", handleKey);
    if (category === "1") dispatch(setItemSerializableStock([]));
    if (category === "2") dispatch(setItemNoSerializableStock([]));
    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [dispatch, category]);

  return (
    <section className="_uploadStock-container">
      <h2>Cargar Inventario</h2>
      <TabContext value={category}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList aria-label="basic tabs example" onChange={handleTab}>
            <Tab label="SERIALIZABLE" value="1" />
            <Tab label="NO SERIALIZABLE" value="2" />
          </TabList>
        </Box>
      </TabContext>
      <FormGroup
        sx={{
          paddingTop: "10px",
          maxHeight: "80%",
          overflow: "auto",
          flexDirection: "row !important",
        }}
      >
        {category === "2" && (
          <Box sx={{ "& > :not(style)": { m: 1 } }} onClick={addItemNoSerializable}>
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Box>
        )}
        {true
          ? serializableStock.map((element, idx) => (
              <RowForm
                data={element}
                postion={idx}
                key={idx}
                category={category}
              />
            ))
          : noSerializableStock.map((element, idx) => (
              <RowForm
                data={element}
                postion={idx}
                key={idx}
                category={category}
              />
            ))}
      </FormGroup>
      <Button
        variant="contained"
        endIcon={<UploadIcon />}
        onClick={() => dispatch(uploadStock())}
        className="_uploadStock-upload-btn"
      >
        Cargar
      </Button>
      {checkLoading && (
        <Fab color="primary" sx={buttonSx}>
          <CheckIcon />
        </Fab>
      )}
    </section>
  );
};

export default UploadStock;

const RowForm = ({ data, postion, category }) => {
  console.log("data", data)
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
  const handleChangeNoSerializable = (e, pos) => {
    dispatch(
      updateItemSerializableStock({
        ...data,
        idArray: pos,
        cantidad: e.target?.value,
      })
    );
  };
  const handleChangeAutoComplete = (e, newValue, pos) => {
    console.log("Cambio")

    dispatch(
      updateItemSerializableStock({
        ...data,
        idArray: pos,
        id: newValue,
      })
    );
  };
  const deleteItemSerializable = (pos) => {
    dispatch(deleteItemSerializableStock(pos));
  };
  const deleteItemNoSerializable = (pos) => {
    console.log(pos)
    dispatch(deleteItemNoSerializableStock(pos));
  };
  return (
    <FormControl className="_uploadStock-form-row">
      <div style={{ width: "30%" }}>
        <InputLabel htmlFor="component-outlined">
          {category === "1" ? "Serial" : "Cantidad"}
        </InputLabel>
        <OutlinedInput
          autoComplete="off"
          id="component-outlined"
          label={category === "1" ? "Serial" : "Cantidad"}
          onChange={(e) => category === "1" ? handleChange(e, postion): handleChangeNoSerializable(e, postion)}
          value={category === "1" ? data.serial : data.cantidad}
          sx={{ width: "100%" }}
        />
      </div>
      <Autocomplete
        id="combo-box-demo"
        value={data.id ?? null}
        options={options}
        sx={{ width: "40%" }}
        onChange={(e, nV) =>handleChangeAutoComplete(e, nV, postion)}
        renderInput={(params) => <TextField {...params} label="Equipo" />}
      />
      <IconButton
        color="primary"
        onClick={() => deleteItemSerializable(postion)}
      >
        <ClearIcon />
      </IconButton>
    </FormControl>
  );
};
