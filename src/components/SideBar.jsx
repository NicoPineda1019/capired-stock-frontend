import React from "react";
import Icon from "@mdi/react";
import { mdiStore, mdiHandCoin, mdiUploadMultiple } from "@mdi/js";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const paths = [
  {
    active: true,
    icon: mdiStore,
    name: "Resumen Inventario",
    path: "/admin/summary",
  },
  {
    active: false,
    icon: mdiStore,
    name: "Inventario",
    path: "/admin/stock",
  },
  {
    active: false,
    icon: mdiHandCoin,
    name: "Asignar Inventario",
    path: "/admin/assign",
  },
  {
    active: false,
    icon: mdiUploadMultiple,
    name: "Cargar Inventario",
    path: "/admin/upload",
  },
];
const SideBar = () => {
  const [routes, setRoutes] = useState(paths);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname) {
      setRoutes(
        routes.map((route) => {
          const newRoute = { ...route };
          newRoute.active = location.pathname === route.path;
          return newRoute;
        })
      );
    }
  }, [location]);

  return (
    <div className="container-main">
      <nav>
        <div className="brand">
          <p>
            Hola,
            <span>Nicolás</span>
          </p>
        </div>
        <hr className="line" />
        <ul className="list">
          {routes.map((item, idx) => (
            <li key={idx} className={item.active ? "active" : ""}>
              <i>
                <Icon path={item.icon} size={1} />
              </i>
              <span onClick={() => navigate(item.path)}>{item.name}</span>
            </li>
          ))}
          <hr className="line" />

          <li>
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Cerrar sesión</span>
          </li>
        </ul>
        {/*         <ul className="list">
          <li className="active">
            <i>
              <Icon path={mdiStore} size={1} />
            </i>
            <a href="/stock">
              <span>Inventario</span>
            </a>
          </li>
          <li>
            <i>
              <Icon path={mdiHandCoin} size={1} />
            </i>
            <span>Asignar Inventario</span>
          </li>
          <li>
            <i>
              <Icon path={mdiUploadMultiple} size={1} />
            </i>
            <a href="/upload">
            <span>Cargar Inventario</span>

            </a>
          </li>
          <li>
            <i className="fa-solid fa-chart-simple"></i>
            <span></span>
          </li>
          <li>
            <i className="fa-solid fa-phone"></i>
            <span>Support</span>
          </li>

          <hr className="line" />

          <li>
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Cerrar sesión</span>
          </li>
        </ul>
 */}{" "}
      </nav>
    </div>
  );
};

export default SideBar;
