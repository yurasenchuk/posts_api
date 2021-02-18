import React, {Component} from "react";
import {connect} from "react-redux";
import "./signUp.css";
import "../static/css/form.css";
import "../static/css/buttons.css";
import Spinner from "../spinner";
import {signUpBack} from "../../actions/userActions";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";

class SignUp extends Component {
    state = {
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        loading: false,
        error: {
            error: false
        }
    }

    validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Enter username!'),
        email: Yup.string()
            .required('Enter email!')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is required!')
            .matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]))(?=.*\d)((?=.*[a-z]))((?=.*[A-Z])).*$/,
                "Password must contain at least 8 characters, one uppercase, one number and one special case character!"),
        confirmPassword: Yup.string()
            .required("Confirm your password")
            .when("password", {
                is: password => (password && password.length > 0),
                then: Yup.string().oneOf([Yup.ref("password")], "Password doesn't match")
            })
    });
    register = (fields) => {
        console.log(fields)
        const {UserService} = this.props;
        this.setState({
            ...this.state,
            loading: true,
            error: {
                error: false
            }
        })
        UserService.signUp(fields)
            .then(this.setState({
                ...this.state,
                loading: false
            }))
            .catch(error => this.setState({
                ...this.state,
                loading: false,
                error: {
                    error: true,
                    status: error.status,
                    shortMessage: error.message,
                }
            }));
    }

    render() {
        const {signUp, signUpBack} = this.props;
        const {loading, error, initialValues} = this.state;
        const errorP = error.error ? <p className="error">{error.shortMessage}</p> : null;
        return (
            <div className={signUp ? "modal-sign_up modal-display-sign_up" : "modal-sign_up"}>
                <div className="modal-content-sign_up">
                    <span className="close" onClick={() => {
                        signUpBack();
                    }}>&times;</span>
                    <Spinner loading={loading}/>
                    <h1 className="text">Sign Up Please</h1>
                    {errorP}
                    <Formik onSubmit={this.register} initialValues={initialValues}
                            validationSchema={this.validationSchema}>
                        {({errors, touched}) => {
                            return (
                                <Form>
                                    <div>
                                        <Field type="text" placeholder="Username" name="username"
                                               className={(errors.username && touched.username) ? "input-field input-field-error" : "input-field"}/>
                                        <ErrorMessage name="username" component="div" className="error-message"/>
                                    </div>
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
                                        <Field type="password" placeholder="Confirm password" name="confirmPassword"
                                               className={(errors.confirmPassword && touched.confirmPassword) ? "input-field input-field-error" : "input-field"}/>
                                        <ErrorMessage name="confirmPassword" component="div" className="error-message"/>
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
        signUp: state.signUp
    }
};
const mapDispatchToProps = {
    signUpBack
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
