import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext({
  authTokens: { accessToken: null, refreshToken: null },
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: () => false,
});

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    return { accessToken, refreshToken };
  });

  const [user, setUser] = useState(null);

  const login = (accessToken, refreshToken, userData = null, navigate = null) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setAuthTokens({ accessToken, refreshToken });
    setUser(userData);

    if (localStorage.getItem('isNewUser') === "true" && userData?.user_type === "SCHOOL" && navigate) {
      navigate('/register-school');
    } else if (navigate) {
      navigate('/dashboard');
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('isNewUser');
    setAuthTokens({ accessToken: null, refreshToken: null });
    setUser(null);
  };

  const isAuthenticated = () => !!authTokens.accessToken;

  return (
    <AuthContext.Provider value={{ authTokens, user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);