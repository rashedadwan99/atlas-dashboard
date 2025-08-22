// src/components/common/table/ReusableTable.jsx
import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { getCurrentLang } from "../../../services/httpService";
import { useDate } from "../../../hooks/useDate";
import { useDispatch } from "react-redux";
import { getGeneralDataAction } from "../../../redux/actions/generalDataActions";
import { CToast } from "../toast/CToast";
import { useNavigate } from "react-router-dom";
import CButton from "../button/CButton";

const DashboardTable = ({
  data,
  columns,
  searchPath,
  onDelete,
  onEdit,
  addPath,
}) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const currentLang = getCurrentLang() || "ar";
  const date = useDate();

  /** 🔍 filter by search term */
  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter((item) => {
      const value =
        item[`name_${currentLang}`]?.toLowerCase() ||
        item[searchPath]?.toString().toLowerCase() ||
        "";
      return value.includes(searchTerm.toLowerCase());
    });
  }, [data, searchTerm, currentLang, searchPath]);

  /** 📄 pagination */
  const paginatedData = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  const handleOpenDialog = (row) => {
    setSelectedRow(row);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedRow(null);
    setOpenDialog(false);
  };
  const dispatch = useDispatch();
  const handleDelete = async () => {
    if (onDelete && selectedRow) {
      try {
        setIsLoading(true);
        await onDelete(selectedRow._id);
        dispatch(getGeneralDataAction());
        CToast("success", "deleted");
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }
    handleCloseDialog();
  };
  const navigate = useNavigate();
  return (
    <Paper sx={{ width: "100%", overflowX: "auto", p: 2 }}>
      {/* 🔍 Search bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <TextField
          label={t("search")}
          variant="outlined"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(0);
          }}
          size="small"
        />
        {addPath && (
          <CButton
            variant="contained"
            color="info"
            size="small"
            onClick={() => navigate(addPath)}
            label="add"
          />
        )}
      </div>

      {/* 📊 Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {[...columns, { label: "created_at", date: true }].map((col) => (
                <TableCell key={col.id || col.label}>{t(col.label)}</TableCell>
              ))}
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData.map((item) => (
              <TableRow key={item._id}>
                {[...columns, { label: "created_at", date: true }].map(
                  (col, i) => (
                    <TableCell key={i}>
                      {col.date
                        ? date(item.createdAt)
                        : col.render(item, currentLang)}
                    </TableCell>
                  )
                )}
                {
                  <TableCell>
                    <CButton
                      variant="contained"
                      color="info"
                      size="small"
                      onClick={() => onEdit(item)}
                      label="edit"
                    />
                  </TableCell>
                }
                <TableCell>
                  <CButton
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleOpenDialog(item)}
                    label="delete"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 📑 Pagination */}
      <TablePagination
        component="div"
        count={filteredData.length}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />

      {/* 🛑 Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{t("confirm_delete")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t("are_you_sure")}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <CButton label="cancel" onClick={handleCloseDialog} />
          <CButton
            onClick={handleDelete}
            color="error"
            disabled={isLoading}
            label="delete"
          />
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default DashboardTable;
