import React, { useState } from 'react'
import { Container, Form, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'

import gql from 'graphql-tag'



function Register() {
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
        update(proxy, result) {
            console.log(result)
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
            <Form onSubmit={onSubmit} noValidate>
                <h1>Register</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username"
                    name="username"
                    type="text"
                    value={values.username}
                    onchange={onChange} />

                <Form.Input
                    label="Email"
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    onchange={onChange} />

                <Form.Input
                    label="Password"
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={values.password}
                    onchange={onChange} />

                <Form.Input
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    onchange={onChange} />


                <Button type="Submit" primary>
                    Register
                </Button>
            </Form>
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