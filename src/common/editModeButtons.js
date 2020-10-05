import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  cancelButton: {
    marginRight: '1rem',
  }
})

const EditButtons = ({ handleCancel, handleSubmit }) => {
  const classes = useStyles();

  return (
    <>
      <Button size="small" variant="contained" color="primary" onClick={handleCancel} className={classes.cancelButton}>
        cancel
    </Button>
      <Button size="small" variant="contained" color="secondary" onClick={handleSubmit}>
        save
    </Button>
    </>
  );
}

export default EditButtons;
