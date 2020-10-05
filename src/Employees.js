import React, { useState, useEffect } from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography
} from '@material-ui/core';
import gql from "graphql-tag";
import { withApollo } from 'react-apollo';

import EditButtons from './common/editModeButtons';
import SimpleModal from './Modal';
import ViewButtons from './common/viewModeButtons';
import { deleteEmployee, updateEmployee } from './graphql/mutations';
import { StyledTableRow, useStyles } from './common/styles';
import { listEmployees } from './graphql/queries';
import { fetchEmployees, fetchSkills } from './common/utils';

function Employees({ client }) {
  const getCheckedObj = () => {
    return skills && skills.length & skills.reduce((acc, b) => ({
      ...acc,
      [b.name]: false,
    }), {})
  };
  const [open, setOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [skills, setSkills] = useState([]);
  const classes = useStyles();
  const [editMode, setEditMode] = useState({
    edit: false,
    id: null,
  });
  const [employeeValue, setEmployeeValue] = useState({
    firstname: '',
    lastname: '',
  })
  const [checked, setChecked] = useState(getCheckedObj);
  const [modalType, setModalType] = useState('');
  const [inProgress, setInProgress] = useState(false);

  const fetchAndSetEmployees = async () => await fetchEmployees(client, setEmployees);
  const fetchAndSetSkills = async () => await fetchSkills(client, setSkills);

  useEffect(() => {
    // Using local storage so data maintained after page refreshes
    const employeeData = localStorage.getItem('employeeData');
    const skillsData = localStorage.getItem('skillsData');

    employeeData
      ? setEmployees(JSON.parse(employeeData))
      : fetchAndSetEmployees();

    skillsData ? setSkills(JSON.parse(skillsData)) : fetchAndSetSkills();
    // eslint-disable-next-line
  }, []);

  const handleOpen = (type) => {
    setModalType(type);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleEmployeeSkillChange = (event) => {
    if (!event.target.checked) {
      const { [event.target.name]: value, ...rest } = checked;
      setChecked(rest);
    } else {
      setChecked({
        ...checked,
        [event.target.name]: event.target.checked,
      });
    }
  }

  const handleDeleteEmployee = async (employee) => {
    setInProgress(true);
    try {
      await client.mutate({
        variables: { input: { id: employee.id } },
        mutation: gql(deleteEmployee),
        awaitRefetchQueries: true,
        refetchQueries: [{
          query: gql(listEmployees),
        }],
      })
      fetchAndSetEmployees();
    }
    catch (error) {
      console.log(`error deleting employee: ${error}`);
    }
    finally {
      setInProgress(false);
    }
  };

  // Convert array of skill IDs into names for 'Skills' column in employee table
  const reformatSkills = (employeeSkills) =>
    JSON.parse(employeeSkills).map(skillId => {
      const skillData = skills.find(elem => elem.id === skillId);
      if (skillData){
        return (
          <div key={skillId}>{skillData.name}</div>
        )
      }
    });

  const handleCancel = () =>
    setEditMode({
      edit: false,
      id: null,
    });

  const handleEditMode = (bool, skill) => {
    // Create object of employee's currently checked skills so the skills will be initially checked in edit mode UI
    const skillNamesArr = JSON.parse(skill.skills)
      .filter(currSkill => skills.find(elem => elem.id === currSkill))
      .map(skillId => skills.find(elem => elem.id === skillId).name)

    const currentlyCheckedSkills = skillNamesArr.reduce((acc, b) => {
      return {
        ...acc,
        [b]: true,
      }
    }, {});
    setChecked(currentlyCheckedSkills);
    setEditMode({
      edit: bool,
      id: skill.id
    });
  };

  const handleEmployeeChange = (event) =>
    setEmployeeValue({
      ...employeeValue,
      [event.target.name]: event.target.value,
    });

  const handleEditEmployeeSubmit = async (event, employee) => {
    event.preventDefault();
    setInProgress(true);

    // Current name is maintained if user does not enter anything for firstname or lastname inputs
    let firstname = employeeValue.firstname ? employeeValue.firstname : employee.firstname;
    let lastname = employeeValue.lastname ? employeeValue.lastname : employee.lastname;

    const skillIds = Object.keys(checked)
      .map(skillName => skills.find(elem => elem.name === skillName).id);

    try {
      await client.mutate({
        variables: { input: { id: editMode.id, firstname, lastname, skills: JSON.stringify(skillIds) } },
        mutation: gql(updateEmployee),
        awaitRefetchQueries: true,
        refetchQueries: [{
          query: gql(listEmployees),
        }],
      });
      await fetchAndSetEmployees();
    }
    catch (error) {
      console.log(`error updating employee: ${error}`);
    }
    finally {
      handleClose();
      setEditMode({
        edit: false,
        id: null,
      });
      setEmployeeValue({
        firstname: '',
        lastname: '',
      });
      setChecked(getCheckedObj());
      setInProgress(false);
    }
  };

  const editModeDisplay = (employee) => (
    <StyledTableRow key={employee.id}>
      <TableCell component="th" scope="row">
        {employee.id}
      </TableCell>

      <TableCell align="left">
        <TextField
          label="first name"
          name="firstname"
          onChange={handleEmployeeChange}
          placeholder={employee.firstname}
          value={employeeValue.firstname}
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </TableCell>
      <TableCell align="left">
        <TextField
          label="last name"
          name="lastname"
          onChange={handleEmployeeChange}
          placeholder={employee.lastname}
          value={employeeValue.lastname}
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
        />
        {inProgress && <CircularProgress/>}
      </TableCell>
      <TableCell align="left">
        {skills.map(skill => (
          <FormControlLabel
            control={<Checkbox
              checked={checked[skill.name]}
              onChange={handleEmployeeSkillChange}
              name={skill.name} size="small" />}
            label={skill.name}
          />
        )
        )}
        <div style={{ color: '#3131f0', cursor: 'pointer' }} onClick={() => handleOpen('skillModal')}>*add a skill not listed</div>
      </TableCell>

      <TableCell align="left" className={classes.iconContainer}>
        <EditButtons handleCancel={handleCancel} handleSubmit={(event) => handleEditEmployeeSubmit(event, employee)} />
      </TableCell>
    </StyledTableRow>
  );

  const viewModeDisplay = employee => (
    <StyledTableRow key={employee.id}>
      <TableCell component="th" scope="row">
        {employee.id}
      </TableCell>
      <TableCell align="left">{employee.firstname}</TableCell>
      <TableCell align="left">{employee.lastname}</TableCell>
      <TableCell align="left">{reformatSkills(employee.skills)}</TableCell>
      <TableCell align="left" className={classes.iconContainer}>
        <ViewButtons handleEditMode={handleEditMode} handleDelete={handleDeleteEmployee} data={employee} />
      </TableCell>
    </StyledTableRow>
  )

  return (
    <>
      <div className={classes.container}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography variant="h5" component="h2" className={classes.h5}>
              Employees
        </Typography>
            <Tooltip title="Add employee">
              <AddCircleIcon className={classes.icon} onClick={() => handleOpen('employeeModal')} />
            </Tooltip>
          </CardContent>

          <TableContainer>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.IDCell}>ID</TableCell>
                  <TableCell align="left" className={classes.firstnameCell}>First Name</TableCell>
                  <TableCell align="left" className={classes.lastnameCell}>Last name</TableCell>
                  <TableCell align="left" className={classes.skillCell}>Skills</TableCell>
                  <TableCell align="left" className={classes.actionCell}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((employee) => (
                  editMode.edit && employee.id === editMode.id
                    ? editModeDisplay(employee)
                    : viewModeDisplay(employee)
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </div>
      <SimpleModal
        allSkills={skills}
        handleClose={handleClose}
        modalType={modalType}
        open={open}
        setEmployees={setEmployees}
        setSkills={setSkills}
      />
    </>
  );
}

export default withApollo(Employees);
