import { ApolloClient } from 'apollo-client';
import {createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

const API_URL = 'https://api-graphql-dev.herokuapp.com/';

const httpLink = createHttpLink({
	uri:API_URL
});

const authLink = setContext((_,{headers}) => {
	const token = localStorage.getItem('mapToken');
	const context = {
		headers:{
			...headers
		}
	}
	if(token) context.headers['authorization'] = `JWT ${token}`

	return context;
	
});

export default new ApolloClient({
	link:authLink.concat(httpLink),
	cache:new InMemoryCache()
});