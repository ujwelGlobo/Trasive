import { AuthProvider } from "@/core/auth/AuthProvider";

const AppProviders = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AppProviders;