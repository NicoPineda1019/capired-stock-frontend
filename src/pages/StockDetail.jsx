import React, { useContext } from "react";
import { Auth } from "../context/auth";
import { useEffect } from "react";
import SideBar from "../components/SideBar";
import Table from "../components/Table";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { useState } from "react";
import { Chip, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryTab,
  setColsTable,
  setStatusTab,
} from "../store/tableStock/tableStockSlice";
import { mapColsTableStock } from "../utils/map";
import { getStockByStatus } from "../store/tableStock/stockThunk";

const StockDetail = () => {
  const auth = useContext(Auth);
  const dispatch = useDispatch();
  const { serializableInfo, noSerializableInfo, categoryTab, statusTab, numberPage, currentPage, loading } =
    useSelector((state) => state.tableStock);

  // console.log('auth', auth)

  const handleCategoryTab = (e, newValue) => {
    dispatch(setCategoryTab(newValue));
  };
  const handleStatusTab = (e, newValue) => {
    dispatch(setStatusTab(newValue));
  };

  useEffect(() => {
    dispatch(getStockByStatus(currentPage, statusTab))
  }, [currentPage, statusTab, dispatch]);

  return (
    <section className="_stock-content">
        <div style={{ marginTop: "20px", width: '90%' }}>
          <Box className="_table-header">
            <TabContext value={categoryTab}>
              <Box sx={{ borderBottom: 1 }}>
                <TabList
                  onChange={handleCategoryTab}
                  indicatorColor="secondary"
                  textColor="inherit"
                >
                  <Tab label="SERIALIZABLE" value="1" />
                  <Tab label="NO SERIALIZABLE" value="2" />
                </TabList>
              </Box>
            </TabContext>
          </Box>
          <Box className="_table-header">
            <TabContext value={statusTab}>
              <Box sx={{ borderBottom: 1 }}>
                <TabList
                  onChange={handleStatusTab}
                  indicatorColor="secondary"
                  textColor="inherit"
                >
                  <Tab label="STOCK" value="1" />
                  <Tab label="ASIGNADO" value="2" />
                  <Tab label="CONSUMIDO" value="3" />
                </TabList>
              </Box>
            </TabContext>
          </Box>
            <Table
              cols={mapColsTableStock(categoryTab, statusTab)}
              rows={categoryTab === "1" ? serializableInfo : noSerializableInfo}
              numberPage={numberPage}
              currentPage={currentPage}
              loading={loading}
            />
        </div>

      {/*       <button onClick={() => {
        auth?.cognitoUser?.signOut()
        auth?.cognitoUser?.globalSignOut({
          onSuccess: () => ({}),
          onFailure: () => ({})
        })}
        }>Salir</button>
 */}{" "}
    </section>
  );
};

export default StockDetail;
