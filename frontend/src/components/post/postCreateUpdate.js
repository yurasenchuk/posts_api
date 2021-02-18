import React, {Component} from "react";
import {WithPostService} from "../../hoc";
import {connect} from "react-redux";
import {signInClicked} from "../../actions/userActions";
import "./post.css";
import "../static/css/form.css";
import "../static/css/buttons.css";
import Spinner from "../spinner";
import * as Yup from "yup";
import {Formik, Form, Field, ErrorMessage} from "formik";
import Error from "../error";
import {Link} from "react-router-dom";

class PostForm extends Component {
    findPost = () => {
        const {PostAPIService, user} = this.props;
        this.setState({
            ...this.state,
            loading: true,
            error: false
        });
        return PostAPIService.getItems(`post/${this.state.id}/`, user)
            .then(
                this.setState({
                    ...this.state,
                    loading: false,
                }))
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
    state = {
        id: this.props.match.params.postId,
        isAddMode: !this.props.match.params.postId,
        initialValues: !this.props.match.params.postId ? {
            title: '',
            link: ''
        } : this.findPost(),
        loading: true,
        error: {
            error: false
        }
    }

    validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required!'),
        link: Yup.string()
            .required('Link is required!'),
    });

    componentDidMount() {
        this.setState({
            ...this.state,
            loading: false
        });
    }


    onSubmit = (fields) => {
        console.log(fields)
        console.log(this.props.user)
        let postData = new FormData();
        postData.append('title', fields.title);
        postData.append('link', fields.link);
        postData.append('author', this.props.user.user_id)
        if (this.state.isAddMode) {
            this.create(postData);
        } else {
            this.update(postData);
        }
    }

    create = (data) => {
        this.setState({
            ...this.state,
            loading: true,
            error: false
        });
        const {PostAPIService, user} = this.props;
        PostAPIService.postItem(`post/`, data, user)
            .then((data) => {
                this.setState({
                    ...this.state,
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

    update = (data) => {
        const {id} = this.state;
        this.setState({
            ...this.state,
            loading: true,
            error: false
        });
        const {PostAPIService, user} = this.props;
        PostAPIService.patchItem(`post/${id}/`, data, user)
            .then(
                this.setState({
                    ...this.state,
                    loading: false
                }))
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
        const {isAddMode, initialValues, loading, error, id} = this.state;
        if (error.error) {
            return <Error status={error.status} shortMessage={error.shortMessage}/>
        }
        const close = isAddMode ? <Link className="close" to={"/"}>&times;</Link> :
            <Link className="close" to={`/post/${id}/`}>&times;</Link>;
        return (
            <div className="post_create_update">
                {close}
                <h1 className="text">{isAddMode ? "Create post" : "Update post"}</h1>
                <Spinner loading={loading}/>
                <Formik initialValues={initialValues} validationSchema={this.validationSchema} onSubmit={this.onSubmit}>
                    {({errors, touched}) => {
                        return (
                            <Form>
                                <div>
                                    <Field type="text" placeholder="Title" name="title"
                                           className={(errors.title && touched.title) ? "input-field input-field-error" : "input-field"}/>
                                    <ErrorMessage name="title" component="div" className="error-message"/>
                                </div>
                                <div>
                                    <Field type="text" placeholder="Link" name="link"
                                           className={(errors.link && touched.link) ? "input-field input-field-error" : "input-field"}/>
                                    <ErrorMessage name="link" component="div" className="error-message"/>
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
        user: state.user
    }
}

const mapDispatchToProps = {
    signInClicked
};
export default WithPostService()(connect(mapStateToProps, mapDispatchToProps)(PostForm));
