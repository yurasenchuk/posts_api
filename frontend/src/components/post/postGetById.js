import React, {Component} from "react";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import {postDeleted, upvoted} from "../../actions/postActions";
import {signInClicked} from "../../actions/userActions";
import Error from "../error";
import WithService from "../../hoc";
import "../postItem/postItem.css";
import "../static/css/buttons.css";
import Spinner from "../spinner";
import CommentList from "../commentList/commentList";
import CommentForm from "../commentForm/comentForm";

class PostGetById extends Component {
    state = {
        id: this.props.match.params.postId,
        loading: true,
        error: {
            error: false
        },
        post: {}
    }

    componentDidMount() {
        const {PostAPIService, signInClicked} = this.props;
        PostAPIService.checkToken(PostAPIService.getItems, `post/${this.state.id}/`)
            .then(res => {
                this.setState({
                    ...this.state,
                    post: {
                        ...res
                    },
                    loading: false
                })
            })
            .catch((e) => {
                if (e.status === 401) {
                    signInClicked()
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

    deleteClick = () => {
        const {postDeleted, signInClicked, PostAPIService} = this.props;
        const {id} = this.state
        PostAPIService.checkToken(PostAPIService.deleteItem, `post/${this.state.id}/`)
            .then(() => {
                postDeleted(id);
                this.setState({
                    ...this.state,
                    post: null
                })
            })
            .catch((e) => {
                if (e.status === 401) {
                    signInClicked()
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

    upvote = () => {
        const {upvoted, signInClicked, PostAPIService} = this.props;
        const {id} = this.state
        PostAPIService.checkToken(PostAPIService.patchItem, `post/${this.state.id}/upvote/`)
            .then(() => {
                upvoted(id);
                this.setState({
                    ...this.state,
                    post: {
                        ...this.state.post,
                        amount_of_upvotes: this.state.post.amount_of_upvotes + 1
                    }
                });
            })
            .catch((e) => {
                if (e.status === 401) {
                    signInClicked()
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
        const {user} = this.props;
        const {error, loading, post, id} = this.state;
        if (error.error) {
            const {status, shortMessage} = error;
            return <Error status={status} shortMessage={shortMessage}/>
        } else if (!post) {
            return <Redirect to={"/"}/>
        }
        const {title, link, author, amount_of_upvotes} = this.state.post;
        const updateDeleteButtons = user.username === post.author ? (<>
            <Link to={`/post/update/${id}/`} className="update-button">
                Update
            </Link>
            <button className="delete-button" onClick={this.deleteClick}>
                Delete
            </button>
        </>) : undefined;
        return (
            <div className="post_item_by_id">
                <Spinner loading={loading}/>
                <button className="delete-button" onClick={this.upvote}>
                    Upvote
                </button>
                {updateDeleteButtons}
                <div className="post_fields_by_id">Title: {title}</div>
                <div className="post_fields_by_id">Link: <a href={link}>{link}</a></div>
                <div className="post_fields_by_id">Posted by: {author}</div>
                <div className="post_fields_by_id">Amount of upvotes: {amount_of_upvotes}</div>
                <CommentList postId={id}/>
                <CommentForm post={id}/>
            </div>
        )
    }
}

const
    mapStateToProps = (state) => {
        return {
            posts: state.post.posts,
            user: state.user.login,
        }
    };

const
    mapDispatchToProps = {
        postDeleted,
        signInClicked,
        upvoted
    };

export default WithService()(connect(mapStateToProps, mapDispatchToProps)(PostGetById));
