import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CircularProgress,
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
import AddCircleIcon from '@material-ui/icons/AddCircle';

import gql from "graphql-tag";
import { withApollo } from 'react-apollo';

import EditButtons from './common/editModeButtons'
import ViewButtons from './common/viewModeButtons';
import { StyledTableRow, useStyles } from './common/styles';
import { deleteSkill, updateSkill } from './graphql/mutations';
import { fetchSkills } from './common/utils';
import { listSkills } from './graphql/queries';
import SimpleModal from './Modal';

function Skills({ client }) {
  const classes = useStyles();
  const [editMode, setEditMode] = useState({
    edit: false,
    id: null,
  });
  const [skillValue, setSkillValue] = useState('');
  const [skills, setSkills] = useState([]);
  const [open, setOpen] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  const fetchAndSetSkills = async () => await fetchSkills(client, setSkills);

  useEffect(() => {
    const skillsData = localStorage.getItem('skillsData');
    skillsData ? setSkills(JSON.parse(skillsData)) : fetchAndSetSkills();
    // eslint-disable-next-line
  }, []);

  const handleCancel = () =>
    setEditMode({
      edit: false,
      id: null,
    });

  const handleOpen = (type) => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeleteSkill = async (skill) => {
    setInProgress(true);
    try {
      await client.mutate({
        variables: { input: { id: skill.id } },
        mutation: gql(deleteSkill),
        awaitRefetchQueries: true,
        refetchQueries: [{
          query: gql(listSkills),
        }],
      });

      fetchAndSetSkills();
    }
    catch (error) {
      console.log(`error deleting employee: ${error}`);
    }
    finally {
      setInProgress(false);
    }
  };

  const handleEditMode = (bool, skill) =>
    setEditMode({
      edit: bool,
      id: skill.id
    });

  const handleSkillChange = (event) => setSkillValue(event.target.value);

  const handleEditSkillSubmit = async (event) => {
    event.preventDefault();
    setInProgress(true);

    try {
      await client.mutate({
        variables: { input: { id: editMode.id, name: skillValue } },
        mutation: gql(updateSkill),
        awaitRefetchQueries: true,
        refetchQueries: [{
          query: gql(listSkills),
        }],
      });
      await fetchAndSetSkills();
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
      setInProgress(false);
    }
  };

  const editModeDisplay = (skill) => (
    <StyledTableRow key={skill.name}>
      <TableCell component="th" scope="row">
        {skill.id}
      </TableCell>

      <TableCell className={classes.skillNameRow}>
        <TextField
          id="standard-size-small"
          label="name"
          name="name"
          onChange={handleSkillChange}
          placeholder={skill.name}
          value={skillValue}
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
        />
        {inProgress && <CircularProgress/>}
      </TableCell>
      <TableCell align="left" className={classes.iconContainer}>
        <EditButtons handleCancel={handleCancel} handleSubmit={handleEditSkillSubmit} />
      </TableCell>

    </StyledTableRow>
  );

  const viewModeDisplay = (skill) => (
    <StyledTableRow key={skill.name}>
      <TableCell component="th" scope="row">
        {skill.id}
      </TableCell>
      <TableCell className={classes.skillNameRow}>{skill.name}</TableCell>
      <TableCell align="left" className={classes.iconContainer}>
        <ViewButtons handleEditMode={handleEditMode} handleDelete={handleDeleteSkill} data={skill} />
      </TableCell>
    </StyledTableRow>
  )

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography variant="h5" component="h2" className={classes.h5}>
            Skills
          </Typography>
          <Tooltip title="Add skill">
            <AddCircleIcon className={classes.icon} onClick={() => handleOpen('skillsModal')} />
          </Tooltip>
        </CardContent>
        <TableContainer className={classes.tableMain} >
          <Table className={classes.table} aria-label="simple table">
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell className={classes.skillsIDCell}>ID</TableCell>
                <TableCell className={classes.skillsNameCell}>Name</TableCell>
                <TableCell align="left" className={classes.actionCell}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                skills.map((skill) => (
                  editMode.edit && skill.id === editMode.id
                    ? editModeDisplay(skill)
                    : viewModeDisplay(skill)
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
        <SimpleModal
          allSkills={skills}
          handleClose={handleClose}
          modalType="skillsModal"
          open={open}
          setSkills={setSkills}
        />
      </Card>
    </div>
  );
}

export default withApollo(Skills);
