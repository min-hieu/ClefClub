import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Navbar from '../../../components/shared/Navbar';

const styles = {
};

function NewSession({ classes }) {
  return (
    <div>
			<Typography>New Session</Typography>
			<Navbar />
    </div>
  );
}

export default withStyles(styles)(NewSession);
