import '../css/navbar.scss';
import NavButton from './button.js';
import React from 'react';

function Navbar() {
  return (
	  <nav class="menu">
			<NavBtn text="Home" link="/" />
			<NavBtn text="Profile" link="/" />
			<NavBtn text="Session" link="/" />
			<NavBtn text="Rewind" link="/" />
			<NavBtn text="Search" link="/" />
		</nav>
  );
}

export default Navbar;
