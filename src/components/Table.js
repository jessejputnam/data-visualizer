import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import styled from "@emotion/styled";

export default function BasicTable({ selectedOpp, data }) {
  const StyledTable = styled(Table)`
    && .header * {
      color: white;
      background-color: #0a193f;
    }

    && .table-row {
      transition: background-color 0.25s, color 0.25s;
      cursor: pointer;

      &:hover {
        color: white;
        background-color: var(--dark-blue);
      }

      &:hover * {
        color: white;
      }
    }

    && .alt {
      background-color: var(--light-blue);
    }
  `;

  const StyledCell800 = styled(TableCell)`
    box-shadow: -1px 0 0 0 white;

    @media only screen and (max-width: 800px) {
      display: none;
    }
  `;

  const StyledCell500 = styled(TableCell)`
    box-shadow: -1px 0 0 0 white;

    @media only screen and (max-width: 500px) {
      display: none;
    }
  `;

  const handleRowClick = (_, row) => selectedOpp(row.oppId);

  return (
    <TableContainer
      sx={{ maxWidth: "1000px", margin: "0 auto" }}
      component={Paper}
    >
      <StyledTable aria-label="simple table">
        <TableHead className="header">
          <TableRow>
            <TableCell align="left">Opp Names</TableCell>
            <TableCell sx={{ boxShadow: "-1px 0 0 0 white" }} align="left">
              Opp Stage
            </TableCell>
            <StyledCell500 align="left">Rep Probability</StyledCell500>
            <StyledCell500 align="left">PX Probability</StyledCell500>
            <StyledCell500 align="left">PX Tier</StyledCell500>
            <StyledCell800 align="left">Amount</StyledCell800>
            <StyledCell800 align="left">Product</StyledCell800>
            <StyledCell800 align="left">Sales Rep</StyledCell800>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              onClick={(event) => handleRowClick(event, row)}
              key={row.oppId}
              className={row.oppId % 2 === 0 ? "table-row" : "table-row alt"}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <span style={{ fontSize: ".7rem" }}>
                  {row.oppName.split("-").slice(0, 2).join(" - ")}
                </span>
                <br />
                <span>{row.oppName.split("-")[2]}</span>
              </TableCell>
              <TableCell sx={{ boxShadow: "-1px 0 0 0 white" }} align="left">
                {row.stage}
              </TableCell>
              <StyledCell500 align="left">{row.repProbability}</StyledCell500>
              <StyledCell500 align="left">
                {row.pilytixProbability}
              </StyledCell500>
              <StyledCell500 align="left">{row.pilytixTier[0]}</StyledCell500>
              <StyledCell800 align="left">{row.amount}</StyledCell800>
              <StyledCell800 align="left">{row.product}</StyledCell800>
              <StyledCell800 align="left">{row.salesRepName}</StyledCell800>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
}
