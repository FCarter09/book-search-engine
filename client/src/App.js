import React from 'react';
import { setContext } from '@apollo/client/link/context';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

// establish a new link to the GraphQL server at its /graphql endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// instantiate the Apollo Client instance and create the connection to the API endpoint
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <>
        <Navbar />
        
        <Routes>
          <Route  
              path='/' 
              element={<SearchBooks />} 
               />
          <Route
             path='/saved' 
             element={<SavedBooks />} 
             />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Routes>
        
      </>
    </Router>
   </ApolloProvider>
  );
}

export default App;
