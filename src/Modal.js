import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Modal,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withApollo } from 'react-apollo';
import { createEmployee, createSkill } from './graphql/mutations';
import { listEmployees, listSkills } from './graphql/queries';
import gql from "graphql-tag";
import { fetchEmployees, fetchSkills } from './common/utils';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


function SimpleModal({
  allSkills,
  client,
  handleClose,
  modalType,
  open,
  setEmployees,
  setSkills,
}) {
  const getCheckedObj = () => {
    return allSkills && allSkills.length & allSkills.reduce((acc, b) => ({
      ...acc,
      [b.name]: false,
    }), {})
  }

  const [checked, setChecked] = useState(getCheckedObj);
  const [value, setValue] = useState({ firstname: '', lastname: '' });
  const [skillValue, setSkillValue] = useState('');
  const [inProgress, setInProgress] = useState(false);

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const handleChange = (event) => {
    const newObj = {
      ...checked,
      [event.target.name]: event.target.checked,
    }
    setChecked(newObj);
  };

  const handleNameChange = (event) =>
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setInProgress(true);
    const [firstname, lastname, ...rest] = event.target;
    const checkboxes = rest
      .slice(0, rest.length - 1)
      .filter(elem => elem.checked)
      .map(elem => elem.name);

    const skillIds = checkboxes.map(elem => allSkills.find(skill => skill.name === elem).id);

    try {
      if (!firstname.value || !lastname.value) return;
      const input = {
        firstname: firstname.value,
        lastname: lastname.value,
        skills: JSON.stringify(skillIds),
      };

      await client.mutate({
        variables: { input },
        mutation: gql(createEmployee),
        awaitRefetchQueries: true,
        refetchQueries: [{
          query: gql(listEmployees),
        }],
      })

      await fetchEmployees(client, setEmployees);
      handleClose();
    }
    catch (err) {
      console.log('error creating employee:', err)
    }
    finally {
      setValue({ firstname: '', lastname: '' });
      setInProgress(false);
    }
  }

  const handleSkillChange = (event) => setSkillValue(event.target.value);

  const handleSkillSubmit =  async (event) => {
    event.preventDefault();
    const [ skillname ] = event.target;
    setInProgress(true);

    try {
      if (!skillname.value) return;
      await client.mutate({
        variables: { input: { name: skillname.value}},
        mutation: gql(createSkill),
        awaitRefetchQueries: true,
        refetchQueries: [{
          query: gql(listSkills),
        }],
      })

      await fetchSkills(client, setSkills);
      handleClose();
    }
    catch (err) {
      console.log('error creating skill:', err)
    }
    finally {
      setSkillValue('');
      setInProgress(false);
    }
  }

  const body = modalType === 'employeeModal'
    ? (
      <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">Add an Employee</h2>
        <form className={classes.root} onSubmit={handleSubmit}>
          <TextField id="standard-basic" label="First name" name="firstname" value={value.firstname} onChange={handleNameChange} required size="small"/>
          <TextField id="standard-basic" label="Last name" name="lastname" value={value.lastname} onChange={handleNameChange} required size="small"/>

          <div style={{ paddingTop: '1rem'}}>
            <div>Select skills: </div>
            {allSkills.map(skill => (
              <FormControlLabel
                control={
                <Checkbox
                  checked={checked[skill.name] ? checked[skill.name] : false}
                  onChange={handleChange}
                  name={skill.name}
                  size="small"
                />}
                label={skill.name}
              />
            ))}
          </div>
          <Button variant="contained" color="primary" type="submit" onSubmit={handleSubmit}>Submit</Button>
          {inProgress && <CircularProgress/>}
        </form>
        <SimpleModal />
      </div>
    )
    : (
      <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">Add a Skill</h2>
        <form className={classes.root} onSubmit={handleSkillSubmit}>
          <TextField id="standard-basic" label="Skill name" name="skillname" value={skillValue} onChange={handleSkillChange} required />

          <Button variant="contained" color="primary" type="submit" onSubmit={handleSkillSubmit}>Submit</Button>
          {inProgress && <CircularProgress/>}
        </form>
        <SimpleModal />
      </div>
    )
    ;

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

export default withApollo((SimpleModal))
