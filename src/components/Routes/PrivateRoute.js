import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, isAuthenticated, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
