import React, { useEffect, useState } from 'react'
import { Icon, Label, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'

import gql from 'graphql-tag'


function LikeButton({ user, post: { id, likes, likeCount } }) {

    const [liked, setLiked] = useState(false);

    // find if user already liked
    useEffect(() => {
        if (user && likes.find(like => like.username === user.username)) {
            setLiked(true)
        } else {
            setLiked(false)
        }
    }, [user, likes]);

    // like post Mutation
    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id }
    })

    const likeButton = user ? (
        liked ? (
            <Button color='blue'>
                <Icon name='heart' />
            </Button>
        ) : (
                <Button color='blue' basic>
                    <Icon name='heart' />
                </Button>
            )
    ) : (
            <Button as={Link} to='/login' color='blue' basic>
                <Icon name='heart' />
            </Button>
        )

    return (
        <Button as='div' labelPosition='right' onClick={likePost}>
            {likeButton}
            <Label basic color='blue' pointing='left'>
                {likeCount}
            </Label>
        </Button>
    )
}

const LIKE_POST_MUTATION = gql`
mutation likePost($postId: ID!){
    likePost(postId: $postId){
        id
        likes{
            id username
        }
        likeCount
    }
}
`

export default LikeButton;
