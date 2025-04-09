import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

function createData(id, name, time, v1, v2, v3, l1, l2, l3, pfavg, fq, pavg) {
  // Format time from ISO to DD-MM-YYYY HH:mm:ss
  const formatTime = (isoTime) => {
    if (!isoTime || isoTime === "N/A") return "N/A";
    const date = new Date(isoTime);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

  return {
    id,
    name,
    time: formatTime(time),
    v1,
    v2,
    v3,
    l1,
    l2,
    l3,
    pfavg,
    fq,
    pavg,
  };
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const headCells = [
  { id: "name", numeric: false, disablePadding: true, label: "Meters" },
  { id: "time", numeric: true, disablePadding: true, label: "Last Update" },
  { id: "v1", numeric: true, disablePadding: false, label: "Voltage (V1)" },
  { id: "v2", numeric: true, disablePadding: false, label: "Voltage (V2)" },
  { id: "v3", numeric: true, disablePadding: false, label: "Voltage (V3)" },
  { id: "l1", numeric: true, disablePadding: false, label: "Current (L1)" },
  { id: "l2", numeric: true, disablePadding: false, label: "Current (L2)" },
  { id: "l3", numeric: true, disablePadding: false, label: "Current (L3)" },
  {
    id: "pfavg",
    numeric: true,
    disablePadding: false,
    label: "Power Factor Avg.",
  },
  { id: "fq", numeric: true, disablePadding: false, label: "Frequency" },
  {
    id: "pavg",
    numeric: true,
    disablePadding: false,
    label: "Active Power (KW)",
  },
];

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.numeric ? "center" : "left"}
            sortDirection={false}
          >
            {headCell.label}
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function EnhancedTable() {
  const theme = useTheme();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [totalCount, setTotalCount] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_SERVER_API_URL
        }/api/real-time-monitoring/?page=${page}&limit=${rowsPerPage}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const text = await response.text();
      //console.log("Raw response:", text);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = JSON.parse(text);
      if (data.success) {
        const fetchedRows = data.data.devices.map((device) =>
          createData(
            device.id,
            device.name,
            device.time,
            device.v1,
            device.v2,
            device.v3,
            device.l1,
            device.l2,
            device.l3,
            device.pfavg,
            device.fq,
            device.pavg
          )
        );
        setRows(fetchedRows);
        setTotalCount(data.data.pagination.total);
      } else {
        console.error("API error:", data.error);
        setRows([]);
        setTotalCount(0);
      }
    } catch (error) {
      console.error("Fetch error:", error.message);
      setRows([]);
      setTotalCount(0);
    }
  };

  React.useEffect(() => {
    fetchData(); // Initial fetch

    // Set up interval to fetch data every 10 seconds (adjust interval as needed)
    const intervalId = setInterval(fetchData, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [page, rowsPerPage]); // Refetch on page or rowsPerPage change

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () => rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [rows, page, rowsPerPage]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper elevation={0} sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <StyledTableRow hover key={row.id}>
                    <StyledTableCell component="th" id={labelId} scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.time}</StyledTableCell>
                    <StyledTableCell align="center">{row.v1}</StyledTableCell>
                    <StyledTableCell align="center">{row.v2}</StyledTableCell>
                    <StyledTableCell align="center">{row.v3}</StyledTableCell>
                    <StyledTableCell align="center">{row.l1}</StyledTableCell>
                    <StyledTableCell align="center">{row.l2}</StyledTableCell>
                    <StyledTableCell align="center">{row.l3}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.pfavg}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.fq}</StyledTableCell>
                    <StyledTableCell align="center">{row.pavg}</StyledTableCell>
                  </StyledTableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={11} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
