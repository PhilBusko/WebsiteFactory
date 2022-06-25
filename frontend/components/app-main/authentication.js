/**************************************************************************************************
AUTHENTICATION
**************************************************************************************************/

import React from 'react';
import axios from 'axios';



const BASE_URL = (process.env.NODE_ENV == 'development' ? 'http://localhost:8000' : 'https://website-factory.herokuapp.com');


const registerConfig = {
    method: 'POST',
    url: `${BASE_URL}/auth/register`,
    headers: {'Content-Type': 'application/json'},
    //data: JSON.stringify(credentials),
}

async function loginUser(credentials) {
    return axios({
        method: 'POST',
        url: `${BASE_URL}/auth/obtain`,
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify(credentials),
    }).then(success => success.data )
}


export { registerConfig, loginUser }



// const [token, setToken] = useState();  // -> passed to Login prop
// if(!token) {
//   return <Login setToken={setToken} />
// }

// async function loginUser(credentials) {
//     return fetch('http://localhost:8080/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(credentials)
//     })
//       .then(data => data.json())
// }

// const handleSubmit = async e => {
//     e.preventDefault();
//     const token = await loginUser({
//       username,
//       password
//     });
//     setToken(token);
// }






// const login = async (e) => {
//     e.preventDefault()
//     try {
//       await api.post('/api/auth', { username, password })
//       router.push('/account')
//     } catch (e) {
//       setPassword('')
//       console.log(e)
//     }
// }


