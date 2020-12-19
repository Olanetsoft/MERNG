import React, { useState } from 'react'
import { Container, Form, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'

import gql from 'graphql-tag'



function Register(props) {

    // set Errors
    const [errors, setErrors] = useState({});

    // set initial state
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    // onchange
    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }


    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, result) {
            
            console.log(result)

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



    // onSubmit
    const onSubmit = (e) => {
        e.preventDefault();
        addUser()
    }


    return (
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Register</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username"
                    name="username"
                    type="text"
                    value={values.username}
                    error={errors.username ? true : false}
                    onChange={onChange} />

                <Form.Input
                    label="Email"
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    error={errors.email ? true : false}
                    onChange={onChange} />

                <Form.Input
                    label="Password"
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange} />

                <Form.Input
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    onChange={onChange} />


                <Button type="Submit" primary>
                    Register
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
const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ){
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ){
            id email username createdAt token
        }
    }
`

export default Register;