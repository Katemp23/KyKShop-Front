import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Login.scss"

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()} className='log-in-btn' >Iniciar sesión</button>;
};

export default LoginButton;