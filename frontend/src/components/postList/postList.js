import React, {Component} from "react";
import PostItem from "../postItem";
import {connect} from "react-redux";
import WithService from "../../hoc";
import {postsLoaded} from "../../actions/postActions";
import {signInClicked} from "../../actions/userActions";
import Spinner from "../spinner";
import "./postList.css";
import "../static/css/buttons.css";
import Error from "../error/error";
import {Link} from "react-router-dom";


class PostList extends Component {
    state = {
        error: {
            error: false
        },
        loading: true
    }

    componentDidMount() {
        const {postsLoaded, signInClicked, PostAPIService} = this.props;
        this.setState({
            ...this.state,
            loading: true,
            error: false
        });
        PostAPIService.checkToken(PostAPIService.getItems, "post/all/")
            .then(res => {
                postsLoaded(res);
                this.setState({
                    ...this.state,
                    loading: false
                });
            })
            .catch((e) => {
                if (e.status === 401) {
                    signInClicked()
                    this.setState({
                        ...this.state,
                        loading: false
                    });
                } else {
                    const error = {
                        error: true,
                        status: e.status,
                        shortMessage: e.message
                    }
                    this.setState({
                        ...this.state,
                        error: error,
                        loading: false
                    });
                }
            });
    }

    render() {
        const {postItems, user} = this.props;
        const {loading, error} = this.state;
        if (error.error) {
            return (
                <>
                    <Error status={error.status} shortMessage={error.shortMessage}/>
                </>
            )
        }
        const addPost = user.logged ? <Link to={'post/create/'} className="create-button">
            <div className="create-button-text">Add post</div>
        </Link> : null;
        return (
            <>
                {addPost}
                <Spinner loading={loading}/>
                <div className="posts_list">
                    {
                        postItems.map(postItem => {
                            return <PostItem key={postItem.id} post={postItem}/>
                        })
                    }
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        postItems: state.post.posts,
        user: state.user.login
    }
};

const mapDispatchToProps = {
    postsLoaded,
    signInClicked
};

export default WithService()(connect(mapStateToProps, mapDispatchToProps)(PostList));