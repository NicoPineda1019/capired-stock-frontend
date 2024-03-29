import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";

const Loading = () => {
  const { show } = useSelector((state) => state.loading);

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={show}
    >
      <CircularProgress color="inherit" size={80}/>
    </Backdrop>
    /*         <Modal
            show={show}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
            >
                <div
                    style={{
                        width: '7vw',
                        height: '7vw',
                    }}
                >
                    <div
                        style={{
                            width: '100%',
                            height: '100%'
                        }}
                        className="spinner-border text-primary" role="status">
                        <span className="sr-only"></span>
                    </div>

                </div>
                <div
                >
                    Cargando...

                </div>
            </Modal.Body>
        </Modal>
 */
  );
};

export default Loading;
