import React, {Component} from "react";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import Error from "../error";
import {WithPostService} from "../../hoc";
import "../postItem/postItem.css";
import "../static/css/buttons.css";
import Spinner from "../spinner";
import CommentList from "../commentList/commentList";

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
        const {PostAPIService, user} = this.props;
        PostAPIService.getItems(`post/${this.state.id}/`, user)
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

    deleteClick = () => {
        const {PostAPIService, user} = this.props;
        const {id} = this.state
        PostAPIService.deleteItem(`post/${id}/`, user)
            .then(() => {
                this.setState({
                    ...this.state,
                    post: null
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

    upvote = () => {
        const {PostAPIService, user} = this.props;
        const {id} = this.state
        PostAPIService.patchItem(`post/${id}/upvote/`, {}, user)
            .then(() => {
                this.setState({
                    ...this.state,
                    post: {
                        ...this.state.post,
                        amount_of_upvotes: this.state.post.amount_of_upvotes + 1
                    }
                });
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
        const {error, loading, post, id} = this.state;
        if (error.error) {
            const {status, shortMessage} = error;
            return <Error status={status} shortMessage={shortMessage}/>
        } else if (!post) {
            return <Redirect to={"/"}/>
        }
        const {title, link, author, amount_of_upvotes} = this.state.post;
        const upvoteButton = user ? <button className="delete-button" onClick={this.upvote}>
            Upvote
        </button> : null;
        const updateDeleteButtons = user ? user.username === post.author ? (<>
            <Link to={`/post/update/${id}/`} className="update-button">
                Update
            </Link>
            <button className="delete-button" onClick={this.deleteClick}>
                Delete
            </button>
        </>) : null : null;
        return (
            <div className="post_item_by_id">
                <Spinner loading={loading}/>
                {upvoteButton}
                {updateDeleteButtons}
                <div className="post_fields_by_id">Title: {title}</div>
                <div className="post_fields_by_id">Link: <a href={link}>{link}</a></div>
                <div className="post_fields_by_id">Posted by: {author}</div>
                <div className="post_fields_by_id">Amount of upvotes: {amount_of_upvotes}</div>
                <CommentList postId={id}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};
export default WithPostService()(connect(mapStateToProps)(PostGetById));
