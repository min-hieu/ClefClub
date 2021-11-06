import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Navbar from '../components/shared/Navbar';

const styles = {};

function Search({ classes }) {
  return (
    <>
			This is search page
      <Navbar />
    </>
  );
}

export default withStyles(styles)(Search);
