import React from "react";
import ReactDOM from "react-dom";
import {App} from "./App";
import {Provider} from "react-redux";
import {store} from "./store";
import "./index.css"

const destination = document.querySelector("#root");

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    destination
);