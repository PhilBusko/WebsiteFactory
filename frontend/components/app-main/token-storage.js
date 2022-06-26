/**************************************************************************************************
TOKEN STORAGE
**************************************************************************************************/

function encryptToken(token) {
    const newToken = token.slice(10, token.length) + token.slice(0, 10);
    return newToken;
}

function decryptToken(token) {
    const newToken = token.slice(token.length -10, token.length) + token.slice(0, token.length -10);
    return newToken;
}

function storeAccessToken(token) {
    const newToken = encryptToken(token);
    localStorage.setItem('accessToken', newToken);
}

function storeRefreshToken(token) {
    const newToken = encryptToken(token);
    localStorage.setItem('refreshToken', newToken);
}

function retrieveAccessToken() {
    const token = localStorage.getItem('accessToken');
    if (token)
        return decryptToken(token);
    else
        return null;
}

function retrieveRefreshToken() {
    const token = localStorage.getItem('refreshToken');
    if (token)
        return decryptToken(token);
    else
        return null;
}

function wipeTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
}


export { storeAccessToken, storeRefreshToken, retrieveAccessToken, retrieveRefreshToken, wipeTokens }
