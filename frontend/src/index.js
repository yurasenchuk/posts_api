import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from "react-router-dom";
import ErrorBoundry from "./components/errorBoundry";
import store from "./store";
import {PostAPIService, UserService} from "./services";
import {PostAPIServiceContext, UserServiceContext} from "./servicesContexts";
import "./index.css";

const postAPIService = new PostAPIService();

const userService = new UserService();


ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundry>
            <UserServiceContext.Provider value={userService}>
                <PostAPIServiceContext.Provider value={postAPIService}>
                    <Router>
                        <App/>
                    </Router>
                </PostAPIServiceContext.Provider>
            </UserServiceContext.Provider>
        </ErrorBoundry>
    </Provider>,
    document.getElementById('app')
);