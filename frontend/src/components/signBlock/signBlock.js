import React, {Component} from "react";
import WithService from "../../hoc";
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
        const {PostAPIService, signOut} = this.props;
        PostAPIService.checkToken(PostAPIService.logOut)
            .then((data) => {
                signOut(data);
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
                        shortMessage: "Something went wrong!"
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
        const {login, PostAPIService} = this.props;
        if (login.logged) {
            return (
                <button className="sign_in_up_out-button" onClick={this.SignOutClick}> Sign out</button>
            )
        }
        return (
            <>
                <button className="sign_in_up_out-button" onClick={this.SignUpClick}> Sign up</button>
                <SignUp PostAPIService={PostAPIService}/>
                <button className="sign_in_up_out-button" onClick={this.SignInClick}>Sign in</button>
                <SignIn PostAPIService={PostAPIService}/>
            </>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        login: state.user.login
    }
};
const mapDispatchToProps = {
    signInClicked,
    signUpClicked,
    signOut
};

export default WithService()(connect(mapStateToProps, mapDispatchToProps)(SignBlock));