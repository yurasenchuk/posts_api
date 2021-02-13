import React, {Component} from "react";
import {tokenLoaded, signInBack} from "../../actions/user_actions";
import {connect} from "react-redux";
import "./sign_in.css";
import "../static/css/form.css";
import "../static/css/buttons.css";
import Spinner from "../spinner";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";

class SignIn extends Component {
    state = {
        initialValues: {
            email: '',
            password: ''
        },
        loading: false,
        error: {
            error: false
        }
    };

    validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required!')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is required!')
    });

    login = (fields) => {
        const {PostAPIService, tokenLoaded} = this.props;
        this.setState({
            ...this.state,
            loading: true,
            error: {
                error: false
            }
        })
        PostAPIService.signIn(fields)
            .then(() => {
                this.setState({
                    ...this.state,
                    loading: false,
                })
                tokenLoaded();
            })
            .catch(error => this.setState({
                    ...this.state,
                    loading: false,
                    error: {
                        error: true,
                        status: error.status,
                        shortMessage: error.message
                    }
                })
            )
    }


    render() {
        const {initialValues, loading, error} = this.state;
        const {signInBack, sign_in} = this.props;
        const errorBlock = error.error ? error.shortMessage : "";
        return (
            <div className={sign_in ? "modal-sign_in modal-display-sign_in" : "modal-sign_in"}>
                <div className="modal-content-sign_in">
                     <span className="close" onClick={() => {
                         signInBack();
                     }}>&times;</span>
                    <h1 className="text">Sign In</h1>
                    {errorBlock}
                    <Spinner loading={loading}/>
                    <Formik onSubmit={this.login} initialValues={initialValues}
                            validationSchema={this.validationSchema}>
                        {({errors, touched}) => {
                            return (
                                <Form>
                                    <div>
                                        <Field type="text" placeholder="Email" name="email"
                                               className={(errors.email && touched.email) ? "input-field input-field-error" : "input-field"}/>
                                        <ErrorMessage name="email" component="div" className="error-message"/>
                                    </div>
                                    <div>
                                        <Field type="password" placeholder="Password" name="password"
                                               className={(errors.password && touched.password) ? "input-field input-field-error" : "input-field"}/>
                                        <ErrorMessage name="password" component="div" className="error-message"/>
                                    </div>
                                    <div>
                                        <button className="btn-submit" type="submit">Submit</button>
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        sign_in: state.user.sign_in,
    }
};
const mapDispatchToProps = {
    tokenLoaded,
    signInBack,
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
