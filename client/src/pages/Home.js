import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Grid } from 'semantic-ui-react'


import { AuthContext } from '../context/auth'
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'
import { FETCH_POSTS_QUERY } from '../utils/graphql'


function Home() {
    // get user
    const { user } = useContext(AuthContext);

    const { loading, data: { getPosts: posts } = {} } = useQuery(FETCH_POSTS_QUERY);

    return (

        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {user && (
                    <Grid.Column>
                        <PostForm />
                    </Grid.Column>
                )}
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

// const FETCH_POSTS_QUERY = gql`
// {
//      getPosts {
//         id
//         body
//         comments {
//             id
//             username
//             body

//         }
//         commentCount
//         likes {
//             username
//         }
//         likeCount
//     }
// }
 
// `;

export default Home;