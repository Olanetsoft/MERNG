import App from './App'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from "apollo-link-context";

// create the httpLink client
const httpLink = createHttpLink({
    uri: 'http://localhost:5000'
});

//Set context for apollo to pick token from the local storage
const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken');

    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
})

// create a new instance of the client
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});



export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)