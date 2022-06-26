import client from './client';

// LOGIN
export const login = ({ username, password }) => {
  console.log(username, password);
  return client.post('/api/auth/login', { username, password });
};

// LEGISTER
export const register = ({ username, password }) =>
  client.post('/api/auth/register', { username, password });

// state check
export const check = () => client.get('/api/auth/check');

// LOGOUT
export const logout = () => client.post('/api/auth/logout');
