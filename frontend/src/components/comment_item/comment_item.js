import React, {Component} from "react";
import "./comment_item.css";

class CommentItem extends Component {
    delete = () => {
        const {commentDeleted, signInClicked, PostAPIService, comment} = this.props;
        const {id} = comment
        PostAPIService.checkToken(PostAPIService.deleteItem, `post/comment/${id}/`)
            .then(() => {
                commentDeleted(id);
                this.setState({
                    ...this.state,
                    post: null
                })
            })
            .catch((e) => {
                if (e.status === 401) {
                    signInClicked()
                }
            });

    }

    render() {
        const {id, content, author} = this.props.comment;
        const updateDelete = this.props.user === author ?
            <button className="comment_button" onClick={this.delete}>
                Delete
            </button> : null
        return (
            <div className="comment_item">
                <div className="comment_content">{content}</div>
                <div className="comment_author">Author: {author}</div>
                {updateDelete}
            </div>
        )
    }
}

export default CommentItem;
