import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from "react-router-dom";
import ErrorBoundry from "./components/errorBoundry";
import store from "./store";
import PostAPIService from "./services";
import PostAPIServiceContext from "./servicesContexts";
import "./index.css";

const postAPIService = new PostAPIService();


ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundry>
            <PostAPIServiceContext.Provider value={postAPIService}>
                <Router>
                    <App/>
                </Router>
            </PostAPIServiceContext.Provider>
        </ErrorBoundry>
    </Provider>,
    document.getElementById('app')
);