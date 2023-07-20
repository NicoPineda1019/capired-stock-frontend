import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Auth } from "../context/auth";
import { getStockByStatus } from "../store/tableStock/stockThunk";
import AccordionStock from "../components/AccordionStock";
import { Box, Pagination, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext/TabContext";
import TabList from "@mui/lab/TabList/TabList";
import {
  setCategoryTab,
  setCurrentPage,
  setStatusTab,
} from "../store/tableStock/tableStockSlice";

const StockDetailResponsive = () => {
  const dispatch = useDispatch();
  const auth = useContext(Auth);
  const { serializableInfo, noSerializableInfo, categoryTab, statusTab, numberPage,
    currentPage,
 } =
    useSelector((state) => state.tableStock);

  const handleChangeTab = (e, newValue) => {
    dispatch(setCategoryTab(newValue));
  };
  const handleStatusTab = (e, newValue) => {
    dispatch(setStatusTab(newValue));
  };
  const handlePageChange = (e, value) => {
    dispatch(setCurrentPage(value))
}

  useEffect(() => {
    dispatch(setStatusTab("2"));
  }, [dispatch]);

  useEffect(() => {
    const user = auth.sesion?.idToken?.payload["email"].split("@")[0];
    if (statusTab !== "1") dispatch(getStockByStatus(currentPage, statusTab, user));
  }, [dispatch, categoryTab, statusTab, currentPage]);

  return (
    <section className="_containers-card-responsive">
      <h3>Inventario</h3>
      <Box sx={{ margin: "10px 0px" }}>
        <TabContext value={categoryTab}>
          <Box>
            <TabList
              textColor="primary"
              indicatorColor="primary"
              onChange={handleChangeTab}
            >
              <Tab label="SERIALIZABLE" value="1" />
              <Tab label="NO SERIALIZABLE" value="2" />
            </TabList>
          </Box>
        </TabContext>
      </Box>
      {statusTab !== "1" && (
        <Box sx={{ margin: "10px 0px" }}>
          <TabContext value={statusTab}>
            <Box>
              <TabList
                textColor="primary"
                indicatorColor="primary"
                onChange={handleStatusTab}
              >
                <Tab label="ASIGNADO" value="2" />
                <Tab label="CONSUMIDO" value="3" />
              </TabList>
            </Box>
          </TabContext>
        </Box>
      )}
      <Pagination sx={{margin: "10px 0px"}} count={numberPage} page={currentPage} color="primary" onChange={handlePageChange} />
      <AccordionStock
        items={categoryTab === "1" ? serializableInfo : noSerializableInfo}
      />
    </section>
  );
};

export default StockDetailResponsive;
