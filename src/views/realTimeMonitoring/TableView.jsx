// TableView.jsx
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
import { io } from "socket.io-client";

function createData(
  id,
  name,
  time,
  v1,
  v2,
  v3,
  v12,
  v23,
  v31,
  l1,
  l2,
  l3,
  ln,
  pf1,
  pf2,
  pf3,
  pfavg,
  fq,
  pavg,
  qavg,
  savg,
  whnet
) {
  const formatTime = (isoTime) => {
    if (!isoTime || isoTime === "N/A" || isoTime === "NaN") return "N/A";
    const date = new Date(isoTime);
    if (isNaN(date.getTime())) return "N/A";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

  const convertToKilo = (value) =>
    value !== undefined && value !== null && value !== "NaN"
      ? Number(value) / 1000
      : "NaN";

  return {
    id,
    name,
    time: formatTime(time),
    v1: v1 ?? "NaN",
    v2: v2 ?? "NaN",
    v3: v3 ?? "NaN",
    v12: v12 ?? "NaN",
    v23: v23 ?? "NaN",
    v31: v31 ?? "NaN",
    l1: l1 ?? "NaN",
    l2: l2 ?? "NaN",
    l3: l3 ?? "NaN",
    ln: ln ?? "NaN",
    pf1: pf1 ?? "NaN",
    pf2: pf2 ?? "NaN",
    pf3: pf3 ?? "NaN",
    pfavg: pfavg ?? "NaN",
    fq: fq ?? "NaN",
    pavg: convertToKilo(pavg),
    qavg: convertToKilo(qavg),
    savg: convertToKilo(savg),
    whnet: convertToKilo(whnet),
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

const columnMapping = {
  "Voltage (V1)": { id: "v1", label: "Voltage (V1)" },
  "Voltage (V2)": { id: "v2", label: "Voltage (V2)" },
  "Voltage (V3)": { id: "v3", label: "Voltage (V3)" },
  "Voltage (RY)": { id: "v12", label: "Voltage (V12)" },
  "Voltage (YB)": { id: "v23", label: "Voltage (V23)" },
  "Voltage (BR)": { id: "v31", label: "Voltage (V31)" },
  "Current (L1)": { id: "l1", label: "Current (L1)" },
  "Current (L2)": { id: "l2", label: "Current (L2)" },
  "Current (L3)": { id: "l3", label: "Current (L3)" },
  "Current (LN)": { id: "ln", label: "Neutral Current (LN)" },
  "Power Factor (PF1)": { id: "pf1", label: "Power Factor (PF1)" },
  "Power Factor (PF2)": { id: "pf2", label: "Power Factor (PF2)" },
  "Power Factor (PF3)": { id: "pf3", label: "Power Factor (PF3)" },
  "Power Factor (PFavg).": { id: "pfavg", label: "Power Factor Avg." },
  "Frequency (HZ)": { id: "fq", label: "Frequency" },
  "Active Power (KW)": { id: "pavg", label: "Active Power (kW)" },
  "Reactive Power (KVAr)": { id: "qavg", label: "Reactive Power (kVAr)" },
  "Apparent Power (KVA)": { id: "savg", label: "Apparent Power (kVA)" },
  "Active Energy (KWh)": { id: "whnet", label: "Active Energy (kWh)" },
};

function EnhancedTableHead({ columns }) {
  const headCells = [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      display: "table-cell",
      label: "Meters",
    },
    {
      id: "time",
      numeric: true,
      disablePadding: true,
      display: "table-cell",
      label: "Last Update",
    },
    ...Object.entries(columnMapping).map(([columnName, { id, label }]) => ({
      id,
      numeric: true,
      disablePadding: false,
      display: columns[columnName] ? "table-cell" : "none",
      label,
    })),
  ];

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.numeric ? "center" : "left"}
            sortDirection={false}
            sx={{ display: headCell.display }}
          >
            {headCell.label}
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function EnhancedTable({ columns }) {
  const theme = useTheme();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [totalCount, setTotalCount] = React.useState(0);
  const socketRef = React.useRef(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchData = async () => {
    try {
      const queryPage = page + 1;
      const response = await fetch(
        `${
          import.meta.env.VITE_SERVER_API_URL
        }/api/real-time-monitoring/?page=${queryPage}&limit=${rowsPerPage}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        if (Array.isArray(data.data)) {
          setRows([]);
          setTotalCount(0);
        } else if (data.data && Array.isArray(data.data.devices)) {
          const fetchedRows = data.data.devices.map((device) =>
            createData(
              device.id,
              device.name,
              device.time,
              device.v1,
              device.v2,
              device.v3,
              device.v12,
              device.v23,
              device.v31,
              device.l1,
              device.l2,
              device.l3,
              device.ln,
              device.pf1,
              device.pf2,
              device.pf3,
              device.pfavg,
              device.fq,
              device.pavg,
              device.qavg,
              device.savg,
              device.whnet
            )
          );
          setRows(fetchedRows);
          setTotalCount(data.data.pagination?.total || 0);
        } else {
          setRows([]);
          setTotalCount(0);
        }
      } else {
        setRows([]);
        setTotalCount(0);
      }
    } catch (error) {
      setRows([]);
      setTotalCount(0);
    }
  };

  React.useEffect(() => {
    fetchData();
    socketRef.current = io(import.meta.env.VITE_SERVER_API_URL, {
      withCredentials: true,
    });

    socketRef.current.on("connect", () => {});
    socketRef.current.on("meterUpdate", (payload) => {
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === payload.meter_id
            ? createData(
                payload.meter_id,
                row.name,
                payload.created_at,
                payload.v1,
                payload.v2,
                payload.v3,
                payload.v12,
                payload.v23,
                payload.v31,
                payload.l1,
                payload.l2,
                payload.l3,
                payload.ln,
                payload.pf1,
                payload.pf2,
                payload.pf3,
                payload.pfavg,
                payload.fq,
                payload.pavg,
                payload.qavg,
                payload.savg,
                payload.whnet
              )
            : row
        )
      );
    });
    socketRef.current.on("connect_error", (err) => {});

    return () => {
      socketRef.current.disconnect();
    };
  }, [page, rowsPerPage]);

  React.useEffect(() => {
    const meterIds = rows.map((row) => row.id);
    meterIds.forEach((meterId) => {
      socketRef.current.emit("subscribe", meterId);
    });

    return () => {
      meterIds.forEach((meterId) => {
        socketRef.current.emit("unsubscribe", meterId);
      });
    };
  }, [rows]);

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
            <EnhancedTableHead columns={columns} />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <StyledTableRow hover key={row.id}>
                    <StyledTableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      sx={{ display: "table-cell" }}
                    >
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{ display: "table-cell" }}
                    >
                      {row.time}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{
                        display: columns["Voltage (V1)"]
                          ? "table-cell"
                          : "none",
                      }}
                    >
                      {row.v1}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{
                        display: columns["Voltage (V2)"]
                          ? "table-cell"
                          : "none",
                      }}
                    >
                      {row.v2}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{
                        display: columns["Voltage (V3)"]
                          ? "table-cell"
                          : "none",
                      }}
                    >
                      {row.v3}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{
                        display: columns["Voltage (RY)"]
                          ? "table-cell"
                          : "none",
                      }}
                    >
                      {row.v12}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{
                        display: columns["Voltage (YB)"]
                          ? "table-cell"
                          : "none",
                      }}
                    >
                      {row.v23}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{
                        display: columns["Voltage (BR)"]
                          ? "table-cell"
                          : "none",
                      }}
                    >
                      {row.v31}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{
                        display: columns["Current (L1)"]
                          ? "table-cell"
                          : "none",
                      }}
                    >
                      {row.l1}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{
                        display: columns["Current (L2)"]
                          ? "table-cell"
                          : "none",
                      }}
                    >
                      {row.l2}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{
                        display: columns["Current (L3)"]
                          ? "table-cell"
                          : "none",
                      }}
                    >
                      {row.l3}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{
                        display: columns["Current (LN)"]
                          ? "table-cell"
                          : "none",
                      }}
                    >
                      {row.ln}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{
                        display: columns["Power Factor (PF1)"]
                          ? "table-cell"
                          : "none",
                      }}
                    >
                      {row.pf1}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{
                        display: columns["Power Factor (PF2)"]
                          ? "table-cell"
                          : "none",
                      }}
                    >
                      {row.pf2}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{
                        display: columns["Power Factor (PF3)"]
                          ? "table-cell"
                          : "none",
                      }}
                    >
                      {row.pf3}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{
                        display: columns["Power Factor (PFavg)."]
                          ? "table-cell"
                          : "none",
                      }}
                    >
                      {row.pfavg}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{
                        display: columns["Frequency (HZ)"]
                          ? "table-cell"
                          : "none",
                      }}
                    >
                      {row.fq}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{
                        display: columns["Active Power (KW)"]
                          ? "table-cell"
                          : "none",
                      }}
                    >
                      {row.pavg}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{
                        display: columns["Reactive Power (KVAr)"]
                          ? "table-cell"
                          : "none",
                      }}
                    >
                      {row.qavg}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{
                        display: columns["Apparent Power (KVA)"]
                          ? "table-cell"
                          : "none",
                      }}
                    >
                      {row.savg}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{
                        display: columns["Active Energy (KWh)"]
                          ? "table-cell"
                          : "none",
                      }}
                    >
                      {row.whnet}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={Object.keys(columnMapping).length + 2} />
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
