import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";
import {Routes, Route, Link} from "react-router-dom";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import ShopsAndScales from "../pages/ShopsAndScales/ShopsAndScales";
import Products from "../pages/Products/Products";
import Categories from "../pages/Categories/Categories";
import OldScales from "../pages/OldScales/OldScales";
import { Login } from "./Auth/Login"



/**
 * Renders the navbar component with a sign-in button if a user is not authenticated
 */
export const PageLayout = (props: { children: any; }) => {
    const isAuthenticated = useIsAuthenticated();

    return (
        <>
            <Navbar bg="primary" variant="dark" style={{display: "flex", flexDirection: "row"}}>
                { isAuthenticated ? <SignOutButton /> : <SignInButton /> }
            </Navbar>
            {props.children}
        </>
    );
};