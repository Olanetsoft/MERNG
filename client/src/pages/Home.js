import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql'

function Home() {
    return (
        <div>
            <h1>Home Page</h1>
        </div>
    )
}

const FETCH_POSTS_QUERY = gql`
    getPosts{
        id body username createdAt likeCount commentCount
        like{
            username
        }
        comments{
            id body createdAt
        }
    }
`

export default Home;