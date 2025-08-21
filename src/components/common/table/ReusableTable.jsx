import React, { useState, useMemo } from "react";
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
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { getCurrentLang } from "../../../services/httpService";
import { useDate } from "../../../hooks/useDate";

const DashboardTable = ({ data, columns, searchPath }) => {
  const { t } = useTranslation();

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const currentLang = getCurrentLang() || "ar";
  const date = useDate();

  /** 🔍 filter by search term */
  const filteredData = useMemo(() => {
    return data?.filter((item) => {
      const value =
        item[`name_${currentLang}`]?.toLowerCase() || item[searchPath];
      return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [data, searchTerm, currentLang]);

  /** 📄 pagination */
  const paginatedData = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredData?.slice(start, start + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

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
      </div>

      {/* 📊 Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.id || col.label}>{t(col.label)}</TableCell>
              ))}
              {/* Always add createdAt as the last column */}
              <TableCell>{t("created_at")}</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData?.map((item) => (
              <TableRow key={item._id}>
                {columns.map((col, i) => (
                  <TableCell key={i}>{col.render(item, currentLang)}</TableCell>
                ))}
                <TableCell>
                  {item.createdAt ? date(item.createdAt) : "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 📑 Pagination */}
      <TablePagination
        component="div"
        count={filteredData?.length || 0}
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
