import React from 'react';
import '../css/Home.css';
import Btn from '../components/shared/button';
import Navbar from '../components/shared/navbar';

function Home() {
  return (
    <div className="Home">
			<spam id="main-title">
				Hello this is main page.
			</spam>
			<Btn text="awesome button" link="ok"/>
      < Navbar />
    </div>
  );
}

export default Home;
