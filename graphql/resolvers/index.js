const postResolvers = require('./posts');
const userResolvers = require('./users');
const commentsResolvers = require('./comments');

module.exports = {
    Query: {
        ...postResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentsResolvers.Mutation
    }
}
