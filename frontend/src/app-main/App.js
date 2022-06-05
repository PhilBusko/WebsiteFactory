/**************************************************************************************************
APP-ROOT
**************************************************************************************************/
import * as React from 'react';
import { Routes, Route } from 'react-router-dom'
import { RoutesConfig } from './routes'


class App extends React.Component {
   render() {  
      return (
         <Routes> 
            { 
               RoutesConfig.map( ({path, element}, key) => 
                  <Route exact path={ path } element={ element } key={ key } /> )
            }
         </Routes>
      );
   }
}

export default App;
