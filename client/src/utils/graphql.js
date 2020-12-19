import gql from 'graphql-tag'



export const FETCH_POSTS_QUERY = gql`
{
     getPosts {
        id
        body
        createdAt
        username
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