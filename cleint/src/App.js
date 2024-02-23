
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import Title from './component/layout/Title';
import AddPerson from './component/forms/AddPerson';
import People from './component/list/People';
import AddCar from './component/forms/AddCar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import SinglePage from './component/Pages/SinglePage';


function App() {

  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
  });
  return (
      <ApolloProvider client={client}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={ 
                  <div className="App">
                    <Title />
                    <AddPerson />
                    <AddCar />
                    <People />
                  </div>
                }>
                </Route>
                <Route path='/single-page/:id' element={
                  <div className="App">
                    <Title />
                    <SinglePage />
                  </div>
                }>

                </Route>
              </Routes>
            </BrowserRouter>
      </ApolloProvider>

    // {/* <ApolloProvider client={client}>
    //   <div className="App">
    //     <Title/>
    //     <AddPerson/>
    //     <AddCar/>
    //     <People/>
    //   </div>
    // </ApolloProvider> */}
  );
}

export default App;
