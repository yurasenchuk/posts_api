import React from "react";
import PostAPIServiceContext from "../services_contexts";

const WithService = () => (Wrapped) => {
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

export default WithService;