import React, {Component} from "react";
import CommentItem from "../commentItem";
import {connect} from "react-redux";
import WithService from "../../hoc";
import {commentsLoaded, commentDeleted} from "../../actions/commentActions";
import {signInClicked} from "../../actions/userActions";
import "./commentList.css";
import "../static/css/buttons.css";
import Error from "../error/error";


class CommentList extends Component {
    state = {
        error: {
            error: false
        }
    }

    componentDidMount() {
        const {commentsLoaded, signInClicked, PostAPIService, postId} = this.props;
        this.setState({
            ...this.state,
            loading: true,
            error: false
        });
        PostAPIService.checkToken(PostAPIService.getItems, `post/${postId}/comments/`)
            .then(res => {
                commentsLoaded(res);
            })
            .catch((e) => {
                if (e.status === 401) {
                    signInClicked()
                    this.setState({
                        ...this.state,
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
                    });
                }
            });
    }

    render() {
        const {commentItems, user, signInClicked, commentDeleted, PostAPIService} = this.props;
        const {error} = this.state;
        if (error.error) {
            return (
                <>
                    <Error status={error.status} shortMessage={error.shortMessage}/>
                </>
            )
        }
        return (
            <>
                <div className="comments_list">
                    {
                        commentItems.map(commentItem => {
                            return <CommentItem key={commentItem.id} comment={commentItem} user={user}
                                                signInClicked={signInClicked} commentDeleted={commentDeleted}
                                                PostAPIService={PostAPIService}/>
                        })
                    }
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        commentItems: state.comment.comments,
        user: state.user.login.username
    }
};

const mapDispatchToProps = {
    commentsLoaded,
    signInClicked,
    commentDeleted
};

export default WithService()(connect(mapStateToProps, mapDispatchToProps)(CommentList));