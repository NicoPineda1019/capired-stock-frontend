import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import StepperStock from "../../components/StepperStock";
import { setWorks } from "../../store/outputStock/outputStockSlice";
import { getWorks } from "../../store/outputStock/outputStockThunk";

const OutputStockResponsive = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const worksInStorage = JSON.parse(sessionStorage.getItem("works"));
    if (worksInStorage)
      dispatch(setWorks(worksInStorage));
    else dispatch(getWorks());
  }, [dispatch])
  
  return (
    <section className="_outputStock-container">
      <h3>Crear Consumo</h3>
      <StepperStock />
    </section>
  );
};

export default OutputStockResponsive;
