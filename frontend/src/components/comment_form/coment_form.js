import React, {Component} from "react";
import WithService from "../../hoc";
import {connect} from "react-redux";
import {commentUpdateCompleted, commentCreateCompleted} from "../../actions/comment_actions";
import {signInClicked} from "../../actions/user_actions";
import "../static/css/form.css";
import "../static/css/buttons.css";
import "./coment_form.css";
import * as Yup from "yup";
import {Formik, Form, Field, ErrorMessage} from "formik";
import Error from "../error";

class CommentForm extends Component {
    state = {
        initialValues: {
            content: '',
        },
        error: {
            error: false
        }
    }

    validationSchema = Yup.object().shape({
        content: Yup.string()
            .required('Content is required!'),
    });

    componentDidMount() {
        this.setState({
            ...this.state,
            loading: false
        });
    }

    onSubmit = (fields) => {
        let commentData = new FormData();
        commentData.append('content', fields.content);
        commentData.append('post', this.props.post);
        this.create(commentData);
    }

    create = (data) => {
        this.setState({
            ...this.state,
            loading: true,
            error: false
        });
        const {PostAPIService, signInClicked, commentCreateCompleted} = this.props;
        PostAPIService.checkToken(PostAPIService.postItem, `post/comment/`, data)
            .then((data) => {
                commentCreateCompleted(data);
                this.setState({
                    ...this.state,
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

    render() {
        const {initialValues, error} = this.state;
        if (error.error) {
            return (
                <>
                    <Error status={error.status} shortMessage={error.shortMessage}/>
                </>
            )
        }
        return (
            <div className="comment_create">
                <Formik initialValues={initialValues} validationSchema={this.validationSchema} onSubmit={this.onSubmit}>
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
        )
    }
}

const mapStateToProps = (state) => {
    return {
        comments: state.comment.comments
    }
};
const mapDispatchToProps = {
    commentUpdateCompleted,
    commentCreateCompleted,
    signInClicked
};
export default WithService()(connect(mapStateToProps, mapDispatchToProps)(CommentForm));
