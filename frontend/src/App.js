import React, {Component} from 'react';
import NavMenu from "./components/navigation_menu";
import {Route, Switch} from "react-router-dom";
import PostList from "./components/postList";
import PostGetById from "./components/post/postGetById";
import PostForm from "./components/post/postCreateUpdate";
import Footer from "./components/footer";
import "./App.css"

class App extends Component {
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

export default App;