import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import VanillaTilt from 'vanilla-tilt';
import '../css/button.scss';

/* this function return the fancy bouncy button as placeholder,
 * feel free to change it later on. */
function Btn(props) {
	let [rootNode] = useState(0);

	useEffect(() => {
		VanillaTilt.init(rootNode, {
			max: 30,
			scale: 1.2,
			speed: 400,
			glare: true,
			'max-glare': 0.8,
		});
	})

	return (
		<Link to={props.link}>
			<div
				ref={node => (rootNode = node)}
				className="Btn-root"
				>
					<div className="Btn-child disable-select">
							{props.text}
					</div>
			</div>
		</Link>
	)
}

function navBtn(props) {
	return(
		<Link to={props.link}>
			<div className="navBtn">
				<img src={props.text}/>
			</div>
		</Link>
	)
}

export default Btn;
