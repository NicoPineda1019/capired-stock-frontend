import { Autocomplete, FormControl, TextField, Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setWork,
  updateAccountNumber,
  updateNode,
  updateWorkOrder,
} from "../../store/outputStock/outputStockSlice";
import { nextStep } from "../../store/stepperStock/stepperStockSlice";
const FillConsumption = () => {
  const { works, work, accountNumber, workOrder, node } = useSelector(
    (state) => state.outputStock
  );
  const [enableContinue, setEableContinue] = useState(false);
  const dispatch = useDispatch();

  const handleChangeAutoComplete = (e, newValue) => {
    dispatch(setWork(newValue));
  };
  useEffect(() => {
    const isValid = !!work.id && !!accountNumber && !!workOrder && !!node;
    setEableContinue(isValid);
  }, [work, accountNumber, workOrder, node]);

  return (
    <div>
      <FormControl
        sx={{
          width: "100%",
          gap: "10px",
        }}
      >
        <Autocomplete
          id="work"
          size="small"
          value={!work.id ? null : work}
          isOptionEqualToValue={(a, b) => a.id === b.id}
          options={works}
          onChange={(e, nV) => handleChangeAutoComplete(e, nV)}
          renderInput={(params) => (
            <TextField {...params} label={"Tipo de trabajo"} />
          )}
        />
        <TextField
          size="small"
          value={accountNumber}
          onChange={(e) => dispatch(updateAccountNumber(e.target.value))}
          label="Número de cuenta"
          type="number"
          InputProps={{
            inputProps: {
              maxLength: 9,
            }
          }}

        />
        <TextField
          size="small"
          value={workOrder}
          onChange={(e) => dispatch(updateWorkOrder(e.target.value))}
          label="Orden de trabajo"
          InputProps={{
            inputProps: {
              maxLength: 25,
            }
          }}

        />
        <TextField
          size="small"
          value={node}
          onChange={(e) => dispatch(updateNode(e.target.value))}
          label="Nodo"
          InputProps={{
            inputProps: {
              maxLength: 10,
            }
          }}

        />
        <Box sx={{ mb: 2 }}>
          <Button
            variant="contained"
            disabled={!enableContinue}
            onClick={() => dispatch(nextStep())}
            sx={{ mt: 1, mr: 1 }}
          >
            Continuar
          </Button>
        </Box>
      </FormControl>
    </div>
  );
};

export default FillConsumption;
