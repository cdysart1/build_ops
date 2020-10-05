import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';

export const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.selected,
    },
  },
}))(TableRow);

export const useStyles = makeStyles({
  card: {
    margin: 'auto',
    width: '70%',
  },
  cardContent: {
    background: '#41c67e',
    position: 'relative',
  },
  container: {
    background: '#898989',
    height: '92vh',
    paddingTop: '5rem',
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
  h5: {
    color: 'white',
    fontFamily: ['"Allerta Stencil"', 'sans-serif'],
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icon: {
    cursor: 'pointer',
    position: 'absolute',
    right: '1rem',
    color: 'white',
    top: '25%',
    fontSize: '2rem',
  },
  iconContainer: {
    minWidth: '70px',
  },
  actionCell: {
    fontWeight: 'bold',
  },
  firstnameCell: {
    fontWeight: 'bold',
  },
  IDCell: {
    fontWeight: 'bold',
    width: '20%',
  },
  lastnameCell: {
    fontWeight: 'bold',
    width: '20%',
  },
  skillCell: {
    fontWeight: 'bold',
    width: '20%',
  },
  table: {
    minWidth: 650,
  },
  skillsIDCell: {
    fontWeight: 'bold',
    width: '40%',
  },
  skillsNameCell: {
    fontWeight: 'bold',
    width: '35%',
  },

  skillNameRow: {
    padding: '10px',
  },
});
