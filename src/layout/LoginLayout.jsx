import { Outlet } from "react-router-dom";

const LoginLayout = () => {
  return (
    <div className="auth-layout">
      <Outlet />
    </div>
  );
};

export default LoginLayout;
