import React from 'react'
import Icon from '@mdi/react';
import { mdiStore, mdiHandCoin, mdiUploadMultiple } from '@mdi/js';

const SideBar = () => {
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
                    <li className="active">

                        <i >
                            <Icon path={mdiStore} size={1} />

                        </i>
                        <span>Inventario</span>
                    </li>
                    <li>
                        <i >
                            <Icon path={mdiHandCoin} size={1} />

                        </i>
                        <span>Asignar Inventario</span>
                    </li>
                    <li>
                        <i >
                            <Icon path={mdiUploadMultiple} size={1} />

                        </i>
                        <span>Cargar Inventario</span>
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

            </nav>

        </div>
    )
}

export default SideBar