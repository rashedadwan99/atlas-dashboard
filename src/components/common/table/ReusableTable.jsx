import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  TablePagination,
} from "@mui/material";
import { useTranslation } from "react-i18next";

/**
 * تنسيق التاريخ
 */
function formatDate(str) {
  if (!str) return "-";
  const date = new Date(str);
  return date.toLocaleDateString();
}

const DashboardTable = ({ data, columns }) => {
  const { t } = useTranslation(); // ✅ استخدام الترجمة

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const currentLang = localStorage.getItem("i18nextLng") || "ar";

  const filteredData = useMemo(() => {
    return data?.filter((item) => {
      const value = item[`name_${currentLang}`]?.toLowerCase() || "";
      return value.includes(searchTerm.toLowerCase());
    });
  }, [data, searchTerm, currentLang]);

  const paginatedData = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredData?.slice(start, start + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  return (
    <Paper sx={{ width: "100%", overflowX: "auto", p: 2 }}>
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
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns?.map((col) => (
                <TableCell key={col.id}>{t(col.label)}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData?.map((item) => (
              <TableRow key={item._id}>
                {columns.map((col) => (
                  <TableCell key={col.id}>
                    {col.render(item, currentLang)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredData?.length}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
    </Paper>
  );
};

export default DashboardTable;
