import React from 'react';
import { withApollo, compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Card from '@material-ui/core/Card';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { listEmployees, listSkills } from './graphql/queries';

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: '#040409',
    display: 'flex',
    justifyContent: 'center',
    height: '8vh'
  },
  body: {
    background: '#898989',
    height: '92vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  card: {
    background: 'transparent',
    padding: '2rem',
  },
  root: {
    flexGrow: 1,
    width: '100%',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  employeeImg: {
    cursor: 'pointer',
  },
}));


function App() {
  const classes = useStyles();

  return (
    <div >
      <section>
        <div className={classes.body}>
          <Card className={classes.card}>
            <Tooltip title="View Skills">
              <Link to={'/skills'}>
                <>
                  <i className="fas fa-tools" style={{
                    fontSize: '8rem',
                    color: 'white',
                    cursor: 'pointer',
                  }}></i>
                  <div style={{
                    fontFamily: ['"Teko"', 'sans-serif'],
                    textAlign: 'center',
                    color: 'white',
                    fontSize: '3rem',
                    paddingTop: '1rem'
                  }}>SKILLS</div>
                </>
              </Link>
            </Tooltip>
          </Card>
          <Card className={classes.card}>

            <Tooltip title="View Employees">
              <Link to={'/employees'}>
                <>
                  <i className="fas fa-users" style={{
                    fontSize: '8rem',
                    color: 'white',
                    cursor: 'pointer',
                  }}></i>
                  <div style={{
                    fontFamily: ['"Teko"', 'sans-serif'],
                    textAlign: 'center',
                    color: 'white',
                    fontSize: '3rem',
                    paddingTop: '1rem'
                  }}>EMPLOYEES
                  </div>
                </>
              </Link>
            </Tooltip>
          </Card>
        </div>
      </section>
    </div>
  );
}

export default compose(withApollo,
  graphql(gql(listEmployees), {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      employees: props.data.listEmployees
    })
  }),
  graphql(gql(listSkills), {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      skills: props.data.listSkills
    })
  }),
)(App)

