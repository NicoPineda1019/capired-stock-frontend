import React, { useCallback, useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Autocomplete,
  Box,
  Button,
  Fab,
  FormControl,
  FormGroup,
  IconButton,
  Input,
  InputLabel,
  OutlinedInput,
  Tab,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import UploadIcon from "@mui/icons-material/Upload";
import { green } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemNoSerializableStock,
  addItemSerializableStock,
  deleteItemSerializableStock,
  resetScannerValue,
  setCategory,
  setItemSerializableStock,
  setMaterial,
  setScannerValue,
  updateItemSerializableStock,
} from "../store/uploadStock/uploadStock";
import {
  getMaterials,
  uploadArrivalConfimration,
  uploadStock,
} from "../store/uploadStock/uploadStockThunk";
import TabContext from "@mui/lab/TabContext/TabContext";
import TabList from "@mui/lab/TabList";
import Toast from "../components/Toast";
import ModalUpload from "../components/ModalUpload";

const UploadStock = () => {
  const dispatch = useDispatch();

  const { serializableStock, noSerializableStock, checkLoading, category } =
    useSelector((state) => state.uploadStock);
  const [enableUpload, setEnableUpload] = useState(false);
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
      if (!(e.target.tagName === "BODY" && category === "1")) return;
      if (e.code === "Enter") {
        dispatch(addItemSerializableStock());
        dispatch(resetScannerValue());
        return;
      }
      dispatch(setScannerValue(e.key.replace("Shift", "")));
    },
    [dispatch, category]
  );

  const handleTab = (e, newValue) => {
    dispatch(setCategory(newValue));
  };

  const addItemNoSerializable = () => {
    dispatch(
      addItemNoSerializableStock([
        {
          cantidad: 0,
        },
      ])
    );
  };

  const handleFile = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      dispatch(uploadArrivalConfimration(reader.result.split(',')[1]))
    };
    reader.onerror = function (error) {
      console.error(error);
    };
    e.target.value = null
  }
  useEffect(() => {
    const materialsInStorage = JSON.parse(sessionStorage.getItem("materials")) ?? {};
    if (Object.keys(materialsInStorage).length > 0)
      dispatch(setMaterial(materialsInStorage));
    else dispatch(getMaterials());
  }, [dispatch]);

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    if (category) dispatch(setItemSerializableStock([]));
    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [dispatch, category, handleKey]);

  useEffect(() => {
    let isValidUpload = false;
    const hasSerial = category === "1";
    for (const item of serializableStock) {
      const validId = !!item.id?.id;
      let validValue = false;
      if (hasSerial) {
        validValue = !!item.serial;
      } else {
        validValue = !!item.cantidad;
      }
      if (!validId || !validValue) {
        isValidUpload = false;
        continue;
      }
      if (validId && validValue) isValidUpload = true;
    }
    setEnableUpload(isValidUpload);
  }, [category, serializableStock]);

  return (
    <section className="_uploadStock-container">
      <ModalUpload />
      <h2>Cargar Inventario</h2>
      <Button variant="contained">
      <UploadIcon />
      <label for="files" style={{cursor: 'pointer'}}>Cargar archivo DICO</label>
      <input id="files" type='file' style={{visibility: 'hidden', position: 'absolute'}} onChange={handleFile}/>
      </Button>
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
          <Box
            sx={{ "& > :not(style)": { m: 1 } }}
            onClick={addItemNoSerializable}
          >
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Box>
        )}
        {serializableStock.map((element, idx) => (
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
        disabled={!enableUpload}
      >
        Cargar
      </Button>
      <Toast
        containerStyles={{ position: "relative", top: "-140px" }}
        alertStyles={{ justifyContent: "center", width: "60%", margin: "auto" }}
      />
    </section>
  );
};

export default UploadStock;

const RowForm = ({ data, postion, category }) => {
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
          type={category === "1" ? "text" : "number"}
          onChange={(e) =>
            category === "1"
              ? handleChange(e, postion)
              : handleChangeNoSerializable(e, postion)
          }
          value={category === "1" ? data.serial ?? "" : data.cantidad ?? 0}
          sx={{ width: "100%" }}
        />
      </div>
      <Autocomplete
        id="combo-box-demo"
        value={data.id ?? null}
        options={
          materials[category === "1" ? "serializable" : "noSerializable"]
        }
        sx={{ width: "40%" }}

        onChange={(e, nV) => handleChangeAutoComplete(e, nV, postion)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={category === "1" ? "Equipo" : "Material"}
          />
        )}
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
