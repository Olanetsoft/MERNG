import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'

import gql from 'graphql-tag'


import { useForm } from '../utils/hooks'
import { FETCH_POSTS_QUERY } from '../utils/graphql'


export default function PostForm() {
    const { onChange, onSubmit, values } = useForm(createPostCallback, {
        body: ''
    })

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {

        //Send back variables
        variables: values,

        update(proxy, result) {
            // read query in cache
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });
            data.getPosts = [result.data.createPost, ...data.getPosts]

            //persist the query to cache
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY, data
            });

            console.log(result)
            values.body = ''
        }
    })

    function createPostCallback() {
        createPost()
    }

    return (
        <div>
            <Form onSubmit={onSubmit}>
                <h2>Create a Post:</h2>
                <Form.Field>
                    <Form.Input
                        placeholder="Hi Tweep!"
                        name="body"
                        type="text"
                        value={values.body}
                        // error={errors.username ? true : false}
                        onChange={onChange}
                    />

                    <Button type="Submit" color="blue">Create Post</Button>

                </Form.Field>
            </Form>
        </div>
    )
}


const CREATE_POST_MUTATION = gql`
mutation createPost($body: String!){
    createPost(body: $body){
        id
        body
        comments {
            id
            username
            body
        }
        commentCount
        likes {
            username
        }
        likeCount
    }
}
`