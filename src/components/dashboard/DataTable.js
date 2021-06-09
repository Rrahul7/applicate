import React from "react";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  {
    field: "user",
    headerName: "User Name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 200,
  },
  { field: "id", headerName: "Order ID", width: 150 },
  { field: "order_date", headerName: "Order Date", width: 150 },
  { field: "status", headerName: "Status", width: 150 },
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
    field: "product_count",
    headerName: "Total Product Count",
    width: 180,
    type: "number",
  },
];

export default function DataTable({ rows }) {
  return (
    <div style={{ height: 400, width: "100%", alignContent: "center" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
}
