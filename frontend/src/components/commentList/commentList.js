import React, {Component} from "react";
import {connect} from "react-redux";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {WithPostService} from "../../hoc";
import "./commentList.css";
import "../static/css/buttons.css";
import "../static/css/form.css";
import Error from "../error/error";


class CommentList extends Component {
    state = {
        error: {
            error: false
        },
        comments: [],
        initialValues: {
            content: '',
        }
    }

    validationSchema = Yup.object().shape({
        content: Yup.string()
            .required('Content is required!'),
    });

    componentDidMount() {
        const {PostAPIService, postId, user} = this.props;
        this.setState({
            ...this.state,
            loading: true,
            error: false
        });
        PostAPIService.getItems(`post/${postId}/comments/`, user)
            .then(res => {
                this.setState({
                    ...this.state,
                    comments: res
                })
            })
            .catch((e) => {
                this.setState({
                    ...this.state,
                });
                const error = {
                    error: true,
                    status: e.status,
                    shortMessage: e.message
                }
                this.setState({
                    ...this.state,
                    error: error,
                });
            });
    }

    onSubmit = (fields) => {
        let commentData = new FormData();
        commentData.append('content', fields.content);
        commentData.append('post', this.props.postId);
        commentData.append('author', this.props.user.user_id)
        this.create(commentData);
    }

    create = (data) => {
        this.setState({
            ...this.state,
            loading: true,
            error: false
        });
        const {PostAPIService, user} = this.props;
        PostAPIService.postItem(`post/comment/`, data, user)
            .then((data) => {
                this.setState({
                    ...this.state,
                    loading: false,
                    comments: [
                        ...this.state.comments,
                        data
                    ]
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

    delete = (id) => {
        const {PostAPIService, user} = this.props;
        PostAPIService.deleteItem(`post/comment/${id}/`, user)
            .then(() => {
                const index = this.state.comments.findIndex(comment => comment.id === id)
                this.setState({
                    ...this.state,
                    comments: [
                        ...this.state.comments.slice(0, index),
                        ...this.state.comments.slice(index + 1)
                    ]
                })
            });
    }

    render() {
        const {user} = this.props;
        const {error, comments, initialValues} = this.state;
        if (error.error) {
            return (
                <h2 className="error-text">Something went wrong while loading comments...Try again later</h2>
            )
        }
        return (
            <>
                <div className="comments_list">
                    {
                        comments.map(commentItem => {
                            const {id, author, content} = commentItem
                            const deleteButton = user ? user.username === author ?
                                <button className="comment_button" onClick={() => {
                                    this.delete(id);
                                }}>
                                    Delete
                                </button> : null : null;
                            return (
                                <div key={id} className="comment_item">
                                    <div className="comment_author_content">{content}</div>
                                    <div className="comment_author">Author: {author}</div>
                                    {deleteButton}
                                </div>
                            )
                        })
                    }
                </div>
                <div className="comment_create">
                    <Formik initialValues={initialValues} validationSchema={this.validationSchema}
                            onSubmit={this.onSubmit}>
                        {({errors, touched}) => {
                            return (
                                <Form>
                                    <div>
                                        <Field type="text" placeholder="Content" name="content"
                                               className={(errors.content && touched.content) ? "input-field input-field-error" : "input-field"}/>
                                        <ErrorMessage name="content" component="div" className="error-message"/>
                                    </div>
                                    <div>
                                        <button className="btn-submit" type="submit">Submit</button>
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
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

export default WithPostService()(connect(mapStateToProps)(CommentList));