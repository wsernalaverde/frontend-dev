import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as HooksProvider } from 'react-apollo-hooks';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.scss';
import client from './graphql'
import Routes from './Routes';
import 'leaflet-draw/dist/leaflet.draw.css'
import './index.scss';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<ApolloProvider client={client}>
		<HooksProvider client={client}>
			<Router>
				<Routes />
			</Router>
		</HooksProvider>
	</ApolloProvider>
	,
	document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
