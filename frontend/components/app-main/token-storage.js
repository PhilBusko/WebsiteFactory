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
    localStorage.setItem('factoryAccess', newToken);
}

function storeRefreshToken(token) {
    const newToken = encryptToken(token);
    localStorage.setItem('factoryRefresh', newToken);
}

function retrieveAccessToken() {
    const token = localStorage.getItem('factoryAccess');
    if (token)
        return decryptToken(token);
    else
        return null;
}

function retrieveRefreshToken() {
    const token = localStorage.getItem('factoryRefresh');
    if (token)
        return decryptToken(token);
    else
        return null;
}

function wipeAccessToken() {
    localStorage.removeItem('factoryAccess');
}

function wipeTokens() {
    localStorage.removeItem('factoryAccess');
    localStorage.removeItem('factoryRefresh');
}

export { 
    storeAccessToken, storeRefreshToken, 
    retrieveAccessToken, retrieveRefreshToken, 
    wipeAccessToken, wipeTokens 
}

