import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../store/modal/modalSlice";

const ModalUpload = () => {
    const dispatch = useDispatch()
    const { show, info } = useSelector(state => state.modal)
  return (
    <Dialog open={show}>
      <DialogTitle id="alert-dialog-title">{"Resultado de cargue"}</DialogTitle>
      <DialogContent>
          <div>Total seriales cargados: {info.totalSend}</div>
          <div>Total seriales confirmados: {info.totalFound}</div>
          <div>
              Los siguientes seriales no se encontraron en la base de datos:
             {info.serialesRemaining} 
          </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(closeModal())}>Aceptar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalUpload;
