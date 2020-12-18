import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { Grid } from 'semantic-ui-react'
import PostCard from '../components/PostCard'


function Home() {
    const { loading, data: { getPosts: posts } } = useQuery(FETCH_POSTS_QUERY);

    return (
        <Grid columns={3} divided>
            <Grid.Row>
                Recent Posts
              </Grid.Row>
            <Grid.Row>
                {loading ? (
                    <h1>Posts Loading...</h1>
                ) : (
                        posts && posts.map(post => (
                            <Grid.Column key={post.id}>
                                <PostCard post={post} />
                            </Grid.Column>
                        ))
                    )}
            </Grid.Row>
        </Grid>
    )
}

const FETCH_POSTS_QUERY = gql`
   {
    getPosts {
        id
        body
        comments {
        id
        body
    }
    commentCount
    likes {
      id
      username
    }
    likeCount
  }
}
`

export default Home;