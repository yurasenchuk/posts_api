import React from "react";
import {PostAPIServiceContext, UserServiceContext} from "../servicesContexts";

const WithPostService = () => (Wrapped) => {
    return (props) => {
        return (
            <PostAPIServiceContext.Consumer>
                {
                    (PostAPIService) => {
                        return <Wrapped {...props} PostAPIService={PostAPIService}/>
                    }
                }
            </PostAPIServiceContext.Consumer>
        )
    }
};

const WithUserService = () => (Wrapped) => {
    return (props) => {
        return (
            <UserServiceContext.Consumer>
                {
                    (UserService) => {
                        return <Wrapped {...props} UserService={UserService}/>
                    }
                }
            </UserServiceContext.Consumer>
        )
    }
}
export {WithPostService, WithUserService};