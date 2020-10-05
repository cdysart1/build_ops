import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles({
  cancelButton: {
    marginRight: '1rem',
  },
  deleteIcon: {
    color: 'grey',
    cursor: 'pointer',
  },
  editIcon: {
    color: 'grey',
    cursor: 'pointer',
    paddingRight: '.5rem',
  },
})

const EditButtons = ({
  data,
  handleEditMode,
  handleDelete,
}) => {
  const classes = useStyles();

  return (
    <>
      <Tooltip title="edit">
        <EditIcon className={classes.editIcon} onClick={() => handleEditMode(true, data)} />
      </Tooltip>
      <Tooltip title="delete">
        <DeleteIcon className={classes.deleteIcon} onClick={() => handleDelete(data)} />
      </Tooltip>
    </>
  );
}

export default EditButtons;
