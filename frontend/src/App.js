import React, {Component} from 'react';
import NavMenu from "./components/navigationMenu";
import {Route, Switch} from "react-router-dom";
import PostList from "./components/postList";
import PostGetById from "./components/post/postGetById";
import PostForm from "./components/post/postCreateUpdate";
import {WithUserService} from "./hoc";
import {connect} from "react-redux";
import Footer from "./components/footer";
import "./App.css"

class App extends Component {
    componentDidMount() {
        const {UserService, refresh} = this.props;
        if (refresh <= Math.ceil(Date.now() / 1000)) {
            UserService.logOut()
                .catch(() => {
                    localStorage.clear();
                })
        }
    }

    render() {
        return (
            <>
                <NavMenu/>
                <div className="main">
                    <Switch>
                        <Route exact path="/" component={PostList}/>
                        <Route exact path="/post/create/" component={PostForm}/>
                        <Route exact path="/post/update/:postId/" component={PostForm}/>
                        <Route exact path="/post/:postId/" component={PostGetById}/>
                    </Switch>
                </div>
                <Footer/>
            </>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        refresh: state.refreshExp
    }
}

export default WithUserService()(connect(mapStateToProps)(App));