import React, { FC } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import App from "components/App";

export const AppWrapper: FC = () => {
    return (
        <BrowserRouter>
            <Provider store={ store }>
                <App />
            </Provider>
        </BrowserRouter>
    );
};