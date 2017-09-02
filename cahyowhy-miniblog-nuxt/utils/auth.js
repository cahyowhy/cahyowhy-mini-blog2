const Cookie = require('cookie');

export const getTokenFromCookie = (req) => {
  try {
    if (!req.headers.cookie) return;
    const tokenCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('token='))
    if (!tokenCookie) return;
    return tokenCookie.split('=')[1];
  } catch (err) {
    return;
  }
};

export const getTokenFromLocalStorage = () => {
  return window.localStorage.token;
};

export const getUserFromCookie = (req) => {
  try {
    if (!req.headers.cookie) return;
    const userCookie = decodeURIComponent(req.headers.cookie.split(';').find(c => c.trim().startsWith('user=')));
    if (!userCookie) return;
    return userCookie.split('=')[1];
  } catch (err) {
    return err;
  }
};

export const getUserFromLocalStorage = () => {
  return window.localStorage.user;
};
