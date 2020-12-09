const { gql } = require('apollo-server');

module.exports = gql`
    type Post{
        id: ID!
        body: String!
        createdAt: String!
        username: String!
        comments: [Comment]!
        likes: [Like]!
    }

    type User{
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }

    type Comment{
        id: ID!
        username: String!
        body: String!
        createdAt: String!

    }
    type Like{
        id: ID!
        createdAt: String!
        username: String!
    }

    input RegisterInput{
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }

    type Mutation{
        register(registerInput: RegisterInput): User!
        login(username: String! , password: String!): User!
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
        createComment(postId: String!, body: String!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!
        likePost(postId: ID!): Post!
    }

    type Query {
        getPosts: [Post]
        getPost(postId: ID!): Post
    }

`;