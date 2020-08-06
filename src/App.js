import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NavBar } from "./features/navBar/NavBar";

export const App = () => {
    return (
        <Router>  
            <NavBar />
            <Switch>
                
            </Switch>
        </Router>
    );
};