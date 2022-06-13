/**************************************************************************************************
INDEX - WEBAPP ENTRY POINT
**************************************************************************************************/
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios';
import { RoutesConfig } from './routes'


// VIRTUAL DOM, ROUTING

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes> 
        { 
          RoutesConfig.map( ({path, element}, key) => 
            <Route exact path={ path } element={ element } key={ key } /> )
        }
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


// AXIOS

axios.defaults.baseURL = (process.env.NODE_ENV == 'development' ? 'http://localhost:8000' : 'https://website-factory.herokuapp.com/' )
axios.defaults.headers.post['Content-Type'] = 'application/json';

/*
the best way to configure axios is in it's own file with create(), but it throws an error
const axiosInstance = axios.create({
  baseURL: (process.env.NODE_ENV == 'development' ? 'http://localhost:8000' : 'https://heroku' ),
  headers: {'Content-Type': 'application/json'},
});
*/

