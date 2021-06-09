import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { yellow } from "@material-ui/core/colors";

const useStyles = makeStyles({
  root: {
    minWidth: 215,
    borderRadius: "5px",
    backgroundColor: yellow,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 8,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function DataCard({ data }) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6" component="button">
          {data[0].title} - {data[0].value}
        </Typography>
        <Typography variant="h6" component="button">
          {data[1].title} - {data[1].value}
        </Typography>
      </CardContent>
    </Card>
  );
}
