const postResolvers = require('./posts');
const userResolvers = require('./users');
const commentsResolvers = require('./comments');

module.exports = {
    // A kind of modifiers that gets the updated counts
    Post: {

        // Return like count using es5
        likeCount(parent) {
            return parent.likes.length
        },
        // Return comments count using es6
        commentCount: (parent) => parent.comments.length
    },
    // A query
    Query: {
        ...postResolvers.Query
    },
    // A mutation
    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentsResolvers.Mutation
    }
}
