export const getTokenFromCookie = (req) => {
  if (!req.headers.cookie) return;
  const tokenCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('token='))
  if (!tokenCookie) return;
  return tokenCookie.split('=')[1];
};

export const getTokenFromLocalStorage = () => {
  return window.localStorage.token;
};

export const getUserFromCookie = (req) => {
  if (!req.headers.cookie) return;
  const userCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('user='))
  if (!userCookie) return;
  return userCookie.split('=')[1];
};

export const getUserFromLocalStorage = () => {
  return window.localStorage.user;
};
