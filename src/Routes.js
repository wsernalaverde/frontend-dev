import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import isAuthenticated from './utils/isAuthenticated';
import Home from './views/Home';
import Login from './views/Login'


function Logout(){
	localStorage.removeItem('mapToken')
	return <Redirect to="/login" />
}

const SecureLogout = isAuthenticated(Logout);

function Routes() {
  return (
   <>
		<Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
		<Route exact path="/logout" component={SecureLogout} />

   </>
  );
}

export default Routes;