import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import '../../css/button.scss';

/* this function return the fancy bouncy button as placeholder,
 * feel free to change it later on. */
function Btn({ text }) {
	return (
		<Button
			variant="contained"
		>
			{text}
		</Button>
	);
}

export default Btn;
