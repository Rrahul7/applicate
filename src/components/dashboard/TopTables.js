import React from "react";
import { DataGrid } from "@material-ui/data-grid";

const columnOrders = [
  { field: "id", headerName: "Order ID", width: 150 },
  {
    field: "amount",
    headerName: "Total Amount",
    width: 180,
    type: "number",
  },
  {
    field: "quantity",
    headerName: "Total Quantity",
    width: 180,
    type: "number",
  },
  {
    field: "user",
    headerName: "User Name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 200,
  },
];

const columnUsers = [
  { field: "id", headerName: "Order ID", width: 150, hide: true },
  {
    field: "user",
    headerName: "User Name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 200,
  },
  {
    field: "amount",
    headerName: "Total Amount",
    width: 180,
    type: "number",
  },
  {
    field: "quantity",
    headerName: "Total Quantity",
    width: 180,
    type: "number",
  },
  { field: "city", headerName: "City", width: 150 },
];

export default function TopTables({ rows, type }) {
  const columns = type ? columnOrders : columnUsers;
  return (
    <div style={{ height: 400, width: "100%", alignContent: "center" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
}
