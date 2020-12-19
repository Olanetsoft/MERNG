import gql from 'graphql-tag'



export const FETCH_POSTS_QUERY = gql`
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