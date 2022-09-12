import React from "react";
import { useMsal } from "@azure/msal-react";
import Button from "react-bootstrap/Button";
import { IPublicClientApplication } from "@azure/msal-browser";

function handleLogout(instance: IPublicClientApplication) {
    instance.logoutPopup().catch((e: any) => {
        console.error(e);
    });
}

/**
 * Renders a button which, when selected, will open a popup for logout
 */
export const SignOutButton = () => {
    const { instance } = useMsal();

    return (
        <>
            <Button variant="secondary" style={{marginLeft: 10, marginRight: 5}}  onClick={() => handleLogout(instance)}>Выйти</Button>
            <Button variant="secondary"> <a style={{textDecoration: "none", color: "#fff"}} href="#">Статус весов</a></Button>
        </>

    );
}