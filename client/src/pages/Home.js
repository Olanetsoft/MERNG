import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { Grid } from 'semantic-ui-react'
import PostCard from '../components/PostCard'


function Home() {
    const { loading, data: {getPosts: posts} = {}  } = useQuery(FETCH_POSTS_QUERY);
    //console.log(posts)
    return (

        <Grid columns={3}>
            <Grid.Row>
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {loading ? (
                    <h1>Posts Loading...</h1>
                ) : (
                        posts && posts.map((post) => (
                            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
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
 
`;

export default Home;