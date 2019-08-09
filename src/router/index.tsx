import React from "react";
import { Router, Route, Switch, Link, NavLink } from "react-router-dom";
import { createBrowserHistory } from "history";
import HomePage from "../components/HomePage";
import PostsPage from "../components/PostsPage";
import PostDetailsPage from '../components/PostDetailsPage';

export const history = createBrowserHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/user/:userId" component={PostsPage} />
                <Route exact path="/user/:userId/:postId" component={PostDetailsPage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;
