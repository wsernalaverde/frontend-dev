import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


function Home() {
	
		return (
			<>
				<Navbar /> 
				<main className="container my-5 py-5">
					<section className="row">
						<div className="col-lg-8 col-md-10 mx-auto">
							<h4>Mapa</h4>
						</div>
					</section>
				</main>
				<Footer />
			</>

		)
	
}

export default Home;