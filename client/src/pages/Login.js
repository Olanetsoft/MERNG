import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'

import gql from 'graphql-tag'


//import hooks
import { useForm } from '../utils/hooks'

function Login(props) {

    // set Errors
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: '',
        password: ''
    })

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, result) {

            //After its successful redirect to homepage
            props.history.push('/')
        },

        // catch errors
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },

        //Send back variables
        variables: values
    })

    //simple call addUser function
    function loginUserCallback() {
        loginUser()
    }


    return (
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Login</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username"
                    name="username"
                    type="text"
                    value={values.username}
                    error={errors.username ? true : false}
                    onChange={onChange} />

                <Form.Input
                    label="Password"
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange} />

                <Button type="Submit" primary>
                    Login
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map((value) => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}


// Graphql mutation
const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ){
        login(
                username: $username
                password: $password
        ){
            id email username createdAt token
        }
    }
`

export default Login;