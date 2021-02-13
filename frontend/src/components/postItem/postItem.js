import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import "./postItem.css";

class PostItem extends Component {
    state = {
        detail: false
    }
    render() {
        const {id, title, author} = this.props.post;
        if (this.state.detail) {
            return <Redirect to={`/post/${id}/`}/>
        }
        return (
            <div className="post_item">
                <div className="post_title">{title}</div>
                <div className="post_author">{author}</div>
                <button className="post_button" onClick={() => {
                    this.setState({
                        detail: true
                    })
                }}>Comments
                </button>
            </div>
        )
    }
}

export default PostItem;
