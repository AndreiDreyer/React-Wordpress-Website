import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DatePicker() {
  const classes = useStyles();
  const month = new Date().getUTCMonth()+1;
  const dateSt = new Date().getFullYear()+"-0"+month+"-0"+new Date().getUTCDate()+"T"+new Date().getHours()+":"+new Date().getMinutes();
  var todaysDate = new Date().getUTCDate()

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="datetime-local"
        label="Next appointment"
        type="datetime-local"
        defaultValue = {dateSt}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}