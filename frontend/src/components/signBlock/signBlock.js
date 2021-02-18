import React, {Component} from "react";
import {WithUserService} from "../../hoc";
import {connect} from "react-redux";
import {signInClicked, signUpClicked, signOut} from "../../actions/userActions";
import "./signBlock.css";
import SignIn from "../signIn/signIn";
import SignUp from "../signUp/signUp";

class SignBlock extends Component {
    SignInClick = () => {
        this.props.signInClicked();
    }

    SignUpClick = () => {
        this.props.signUpClicked();
    }

    SignOutClick = () => {
        const {UserService, signOut} = this.props;
        UserService.logOut()
            .then(() => {
                signOut();
                this.setState({
                    ...this.state,
                    loading: false
                });
            })
            .catch((e) => {
                const error = {
                    error: true,
                    status: e.status,
                    shortMessage: "Something went wrong!"
                }
                this.setState({
                    ...this.state,
                    error: error,
                    loading: false
                });
            });
    }

    render() {
        const {login, UserService} = this.props;
        if (login) {
            return (
                <button className="sign_in_up_out-button" onClick={this.SignOutClick}> Sign out</button>
            )
        }
        return (
            <>
                <button className="sign_in_up_out-button" onClick={this.SignUpClick}> Sign up</button>
                <SignUp UserService={UserService}/>
                <button className="sign_in_up_out-button" onClick={this.SignInClick}>Sign in</button>
                <SignIn UserService={UserService}/>
            </>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        login: state.user,
        refresh: state.refreshExp
    }
};
const mapDispatchToProps = {
    signInClicked,
    signUpClicked,
    signOut
};

export default WithUserService()(connect(mapStateToProps, mapDispatchToProps)(SignBlock));