import React, { useState, useRef, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import { SNAKE_SCORECARD, PLAYER_SCORECARD } from "../../Constants";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles({
  card: {
    height: "800px",
    width: "400px",
    backgroundColor: "#37474F",
    boxShadow: "5px 10px 18px #222",
  },
  cardContent: {
    height: "50%",
  },
  listPrimary: {
    color: "#cddc39",
  },
  listSecondary: {
    color: "#e58d51",
  },
  iconStyle: {
    color: "#263238",
    fontSize: 30,
  },
});
function DisplayText(props) {
  const classes = useStyles();
  const styleObject =
    props.type == "primary" ? classes.listPrimary : classes.listSecondary;
  return <span className={styleObject}>{props.text}</span>;
}
function GameScreen(props) {
  const classes = useStyles();

  let infoToBeDisplayed =
    props.type == "snake" ? SNAKE_SCORECARD : PLAYER_SCORECARD;

  return (
    <Grid item className={classes.card}>
      <List className={classes.root}>
        {infoToBeDisplayed.map((info) => {
          return (
            <ListItem>
              <ListItemAvatar>
                {!info.icon ? (
                  <Avatar className={classes.iconStyle}>MP</Avatar>
                ) : (
                  <info.icon className={classes.iconStyle} />
                )}
              </ListItemAvatar>
              <ListItemText
                primary={<DisplayText type="primary" text={info.label} />}
                secondary={
                  <DisplayText
                    type="secondary"
                    text={
                      info.name in props ? props[info.name] : "Not Computed"
                    }
                  />
                }
              />
            </ListItem>
          );
        })}
      </List>
    </Grid>
  );
}

export default GameScreen;
