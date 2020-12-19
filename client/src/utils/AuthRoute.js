import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../context/auth'


function AuthRoute({ component: Component, ...rest }) {

    //Initialize the context with useContext from react
    const { user } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={props =>
                user ? <Redirect to='/' /> : <Component {...props} />} />
    )
}

export default AuthRoute;