import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setTokenState] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load auth state from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setTokenState(storedToken);
    }

    setLoading(false);
  }, []);

  // 🔥 Login function (NORMALIZES backend response)
  const login = (response) => {
    const { bearer_token, usermaster } = response.result;

  const normalizedUser = {
  id:          usermaster.user_id,
  name:        usermaster.firstName,
  email:       usermaster.email,
  roleType:    usermaster.userType,
  workspaceId: usermaster.workspace_id,
  orgName:     response.result.workspace.name, // ← add this
};
    localStorage.setItem("user", JSON.stringify(normalizedUser));
    localStorage.setItem("token", bearer_token);

    setUser(normalizedUser);
    setTokenState(bearer_token);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
    setTokenState(null);

    window.location.href = "/login";
  };

  const isAuthenticated = !!token;

  // 🔥 Corrected role check
  const hasRole = (role) => {
    return user?.roleType === role;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated,
        hasRole,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);