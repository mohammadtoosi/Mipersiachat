import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import store, { persistor } from "./redux/app/store";
import { PersistGate } from "redux-persist/integration/react";

import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
            <StylesProvider jss={jss}>
                <React.StrictMode>
                    <App />
                </React.StrictMode>
            </StylesProvider>
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);
