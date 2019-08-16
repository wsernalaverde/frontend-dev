import React from 'react';
import { Link } from 'react-router-dom';
import payload from '../utils/payload';

function Navbar() {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
			<div className="container">
				<Link to="/" className="nav-link">Test</Link>
				<button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
					Menu
        		<i className="fas fa-bars"></i>
				</button>
				<div className="collapse navbar-collapse" id="navbarResponsive">
					<ul className="navbar-nav ml-auto">
						<li className="nav-item">
							<Link to="/" className="nav-link">Home</Link>
						</li>
						{
							payload().isAuthenticated ? (
								<>
									<li className="nav-item">
										<Link to="/" className="nav-link">Hola {payload().user.email}!!!</Link>
									</li>
									<li className="nav-item">
										<Link to="/profile" className="nav-link" >Mi perfil</Link>
									</li>
									<li className="nav-item">
										<Link to="/zone/new" className="nav-link" >Crear Zona</Link>
									</li>
									<li className="nav-item">
										<Link to="/logout" className="nav-link" >Logout</Link>
									</li>
								</>
							) : (
									<>
										<li className="nav-item">
											<Link to="/login" className="nav-link">Login</Link>
										</li>
										<li className="nav-item">
											<Link to="/signup" className="nav-link" >Signup</Link>
										</li>
									</>
								)

						}
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default Navbar;