import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Logout.scss"

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button className='log-out-btn' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;