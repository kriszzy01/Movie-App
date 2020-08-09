import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "./features/header/Header";
import { Home } from "./features/pages/home/Home";
import {TopRated} from "./features/pages/TopRated";
import {Upcoming} from "./features/pages/Upcoming";
import {Popular} from "./features/pages/Popular";
import {SearchResults} from "./features/pages/SearchResults";

export const App = () => {
    return (
        <Router>
            <Header />

            <Switch>
                <Route path="/Movie-App"><Home /></Route>
                <Route path="/Top Rated"><TopRated/></Route>
                <Route path="/Upcoming"><Upcoming/></Route>
                <Route path="/Popular"><Popular/></Route>
                <Route path="/Search Results"><SearchResults/></Route>
            </Switch>

        </Router>
    );
};