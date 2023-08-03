import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import FillConsumption from "../pages/OutputStockResponsive/FillConsumption";
import ReviewStock from "../pages/OutputStockResponsive/ReviewStock";
import { useDispatch, useSelector } from "react-redux";
import {
  nextStep,
  previousStep,
  setStep,
} from "../store/stepperStock/stepperStockSlice";
import ConfirmStock from "../pages/OutputStockResponsive/ConfirmStock";
import { resetItemsStock, setRefresh } from "../store/outputStock/outputStockSlice";
import { updateStockConsumed } from "../store/outputStock/outputStockThunk";

const steps = [
  {
    label: "Diligencia la información del consumo",
    component: <FillConsumption />,
  },
  {
    label: "Asigna las cantidades y Revisa el inventario a consumir",
    component: <ReviewStock />,
  },
  {
    label: "Verifica el consumo",
    component: <ConfirmStock />,
  },
];

const StepperStock = () => {
  const { activeStep } = useSelector((state) => state.stepperStock);
  const { refresh } = useSelector(state => state.outputStock)
  const dispatch = useDispatch();
  const handleNext = () => {
    dispatch(nextStep());
  };
  const handleBack = () => {
    dispatch(previousStep());
  };

  const handleReset = () => {
    dispatch(setStep(0));
    dispatch(resetItemsStock())
    dispatch(setRefresh(!refresh))    
  };
  return (
    <Box>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>{step.component}</StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>Haz completado todos los pasos</Typography>
          <Button
            variant="contained"
            onClick={() => dispatch(updateStockConsumed(handleReset))}
            sx={{ mt: 1, mr: 1 }}
          >
            Finalizar consumo
          </Button>
          <Button
            variant="outlined"
            onClick={() => dispatch(previousStep())}
            sx={{ mt: 1, mr: 1 }}
          >
            Volver
          </Button>
          <Button
            variant="outlined"
            onClick={handleReset}
            sx={{ mt: 1, mr: 1 }}
          >
            Cancelar consumo
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default StepperStock;
