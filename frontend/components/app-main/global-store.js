/**************************************************************************************************
GLOBAL STORE
**************************************************************************************************/
import React from 'react';

const GlobalContext = React.createContext(null);

function GlobalProvider({children}) {

  const baseValue = (process.env.NODE_ENV == 'development' ? 'http://localhost:8000' : 'https://website-factory.herokuapp.com/' );

  const [token, setToken] = React.useState(null);
  const [baseUrl, setBaseUrl] = React.useState(baseValue);

  const store = {
    tokenStore: [token, setToken],
    baseUrlStore: [baseUrl, setBaseUrl],
  }

  return (
    <GlobalContext.Provider value={store}>
      { children }
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider }

