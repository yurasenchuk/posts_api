import React, {Component} from "react";
import PostItem from "../postItem";
import {connect} from "react-redux";
import {WithPostService} from "../../hoc";
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
        loading: true,
        posts: []
    }

    componentDidMount() {
        const {PostAPIService, user} = this.props;
        this.setState({
            ...this.state,
            loading: true,
            error: false
        });
        PostAPIService.getItems("post/all/", user)
            .then((res) => {
                this.setState({
                    ...this.state,
                    loading: false,
                    posts: res
                })
            })
            .catch((e) => {
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
            });
    }

    render() {
        const {user} = this.props;
        const {posts, loading, error} = this.state;
        if (error.error) {
            return (
                <>
                    <Error status={error.status} shortMessage={error.shortMessage}/>
                </>
            )
        }
        const addPost = user ? <Link to={'post/create/'} className="create-button">
            <div className="create-button-text">Add post</div>
        </Link> : null;
        return (
            <>
                {addPost}
                <Spinner loading={loading}/>
                <div className="posts_list">
                    {
                        posts.map(postItem => {
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
        user: state.user
    }
};

export default WithPostService()(connect(mapStateToProps)(PostList));