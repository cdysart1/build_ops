import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import logo from './images/letter-a-logo.jpg';

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: '#040409',
    display: 'flex',
    justifyContent: 'center',
    height: '8vh'
  },
  root: {
    flexGrow: 1,
    width: '100%',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color: '#f0f0f0',
    flexGrow: 1,
    fontFamily: ['"Allerta Stencil"', 'sans-serif'],
    fontSize: '2.3rem',
    textAlign: 'center',
  },
  menuItem: {
    '&:hover': {
      background: '#dadef6'
    }
  }
}));

const Header = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <header>
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <img src={logo} alt='logo' height="50"></img>
            <Typography variant="h6" className={classes.title}>
              BuildOps Challenge
            </Typography>
            <MenuIcon aria-controls="simple-menu" aria-haspopup="true" onClick={handleMenuClick} />
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <Link to={'/'}>
                <MenuItem onClick={handleMenuClose} className={classes.menuItem}>Home</MenuItem>
              </Link>
              <Link to={'/skills'}>
                <MenuItem onClick={handleMenuClose} className={classes.menuItem}>Skills</MenuItem>
              </Link>
              <Link to={'/employees'}>
                <MenuItem onClick={handleMenuClose} className={classes.menuItem}>Employees</MenuItem>
              </Link>
            </Menu>
          </Toolbar>
        </AppBar>
      </div>
    </header>
  )
};

export default Header;
