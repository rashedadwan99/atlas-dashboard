import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "55%",
  maxHeight: "80vh",
  left: "50%",
  transform: "translate(-50%, -50%)",
  overflow: "auto",
  width: "80vw",
  bgcolor: "background.paper",
  boxShadow: 24,
  paddingTop: "50px",
  borderRadius: "8px",
};

export default function CModal({ children, open, setIsOpen }) {
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Modal
        keepMounted={false}
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={{ ...style, position: "relative" }}>
          {/* X Button */}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              // color: (theme) => theme.palette.grey[500],
              zIndex: 10,
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Modal Content */}
          {children}
        </Box>
      </Modal>
    </>
  );
}
