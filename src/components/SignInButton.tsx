import React, { useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import Button from "react-bootstrap/Button";
import { IPublicClientApplication } from "@azure/msal-browser";

function handleLogin(instance: IPublicClientApplication) {
  instance
    .loginPopup(loginRequest)
    .then((res) => localStorage.setItem("token5", res.accessToken))
    .catch((e: any) => {
      console.error(e);
    });
}

/**
 * Renders a button which, when selected, will open a popup for login
 */
export const SignInButton = () => {
  const { instance } = useMsal();

  useEffect(() => {
    console.log("instance", instance);
  }, [instance]);

  return (
    <Button
      style={{ marginLeft: 10 }}
      variant="secondary"
      className="ml-auto"
      onClick={() => handleLogin(instance)}
    >
      Войти
    </Button>
  );
};
