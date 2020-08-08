import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "./features/header/Header";
import { Home } from "./features/pages/home/Home";

export const App = () => {
    return (
        <Router>
            <Header />

            <Switch>
                <Route path="/Movie-App"><Home /></Route>
            </Switch>

        </Router>
    );
};