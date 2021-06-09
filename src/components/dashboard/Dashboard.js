import React, { useState, useEffect } from "react";
import _ from "lodash";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import DataCard from "./DataCard";
import Chart from "./Chart";
import TopTables from "./TopTables";
import DataTable from "./DataTable";
import { StyledButton } from "./styles/Dashboard.styles";
import FilterListIcon from "@material-ui/icons/FilterList";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { getOrders, getOrdersByRegion } from "../../api/orderApi";
import { orderDataDaily, monthlyData, chartData } from "../../../tools/utils";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2), //grid padding
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [topOrders, setTopOrders] = useState([]);
  const [bottomOrders, setBottomOrders] = useState([]);
  const [region, setRegion] = useState([]);
  const [regionName, setRegionName] = useState("");

  const handleRegionChange = (e) => {
    e.preventDefault();
    let region = e.target.value;
    setRegionName(region);
    let resp;
    if (region == "") {
      resp = getOrders();
    } else {
      resp = getOrdersByRegion(region);
    }
    setOrders(resp);
    setTopOrders(_.orderBy(resp, ["amount"], ["desc"]).splice(0, 5));
    setBottomOrders(_.orderBy(resp, ["amount"], ["asc"]).splice(0, 5));
  };

  useEffect(() => {
    let resp = getOrders();
    setOrders(resp);
    setTopOrders(_.orderBy(resp, ["amount"], ["desc"]).splice(0, 5));
    setBottomOrders(_.orderBy(resp, ["amount"], ["asc"]).splice(0, 5));
    setRegion(_.uniq(_.map(resp, "region")));

    return () => {
      setOrders([]);
      setTopOrders([]);
      setBottomOrders([]);
      setRegion([]);
    };
  }, []);

  const chart = chartData(orders);
  const dailyData = orderDataDaily(orders);
  const monthData = monthlyData(orders);

  const classes = useStyles();

  return (
    <React.Fragment>
      <StyledButton>
        <FormControl className={classes.formControl}>
          <InputLabel>Region</InputLabel>
          <Select
            value={regionName}
            IconComponent={FilterListIcon}
            onChange={handleRegionChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {region.map((val, index) => (
              <MenuItem key={index} value={val}>
                {val}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Filter by Region</FormHelperText>
        </FormControl>
      </StyledButton>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={3}>
          <DataCard data={dailyData.slice(0, 2)}></DataCard>
        </Grid>
        <Grid item xs={3}>
          <DataCard data={dailyData.slice(2, 4)}></DataCard>
        </Grid>
        <Grid item xs={3}>
          <DataCard data={monthData.slice(0, 2)}></DataCard>
        </Grid>
        <Grid item xs={3}>
          <DataCard data={monthData.slice(2, 4)}></DataCard>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Grid item xs={12}>
            {"Visual Representation of Orders"}
          </Grid>
          <Chart labels={chart.labels} dataValue={chart.orderQuantity}></Chart>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Grid item xs={12}>
            {"Top 5 Orders"}
          </Grid>
          <TopTables rows={topOrders} type={true}></TopTables>
          <Grid item xs={12}>
            {"Bottom 5 Orders"}
          </Grid>
          <TopTables rows={bottomOrders} type={true}></TopTables>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Grid item xs={12}>
            {"Top 5 Users"}
          </Grid>
          <TopTables rows={topOrders} type={false}></TopTables>
          <Grid item xs={12}>
            {"Bottom 5 Users"}
          </Grid>
          <TopTables rows={bottomOrders} type={false}></TopTables>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Grid item xs={12}>
            {"Consolidated Orders Table"}
          </Grid>
          <DataTable rows={orders}></DataTable>
        </Paper>
      </Grid>
    </React.Fragment>
  );
}
