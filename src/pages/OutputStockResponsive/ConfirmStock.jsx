import { Box, Button, FormControl, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  nextStep,
  previousStep,
} from "../../store/stepperStock/stepperStockSlice";

const ConfirmStock = () => {
  const dispatch = useDispatch();

  const { itemsStock } = useSelector((state) => state.outputStock);
  const [itemsAdded] = useState(
    itemsStock.filter((item) => item.isConsumed && (item.nuevaCantidad || item.serial))
  );

  return (
    <section>
      <h6>Tienes {itemsAdded.length} elementos a consumir</h6>
      <FormControl className="_containers-form">
        {itemsAdded.map((item, idx) => (
          <div style={{ width: "100%" }} key={idx}>
            <TextField
              sx={{ width: "95%" }}
              id="outlined-read-only-input-equipo"
              size="small"
              label={item.nombre}
              defaultValue={item.serial ?? item.nuevaCantidad}
              variant="filled"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
        ))}
      </FormControl>
      <Box sx={{ mb: 2 }}>
        <Button
          disabled={itemsAdded.length === 0}
          variant="contained"
          onClick={() => dispatch(nextStep())}
          sx={{ mt: 1, mr: 1 }}
        >
          Continuar
        </Button>
        <Button onClick={() => dispatch(previousStep())} sx={{ mt: 1, mr: 1 }}>
          Volver
        </Button>
      </Box>
    </section>
  );
};

export default ConfirmStock;
