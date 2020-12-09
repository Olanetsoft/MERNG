const { UserInputError, AuthenticationError } = require('apollo-server');

const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth')

module.exports = {
    Mutation: {

        // create comment
        createComment: async (_, { postId, body }, context) => {
            const { username } = checkAuth(context);

            // Check if comment body is not empty
            if (body.trim() === '') {
                throw new UserInputError('Empty Comment', {
                    errors: {
                        body: 'Comment body cannot be empty'
                    }
                })
            }

            // find the post by ID
            const post = await Post.findById(postId);

            // If post exist
            if (post) {
                post.comments.unshift({
                    body,
                    username,
                    createdAt: new Date().toISOString()

                })
                await post.save();
                return post;
            } else {
                throw new UserInputError('Post not Found')
            }
        },

        // Delete comment
        deleteComment: async (_, { postId, commentId }, context) => {
            const { username } = checkAuth(context);

            // Fnd post by ID
            const post = await Post.findById(postId);

           // If post Exist
            if (post) {
                const commentIndex = post.comments.findIndex(c => c.id === commentId);

                if (post.comments[commentIndex].username === username) {
                    post.comments.splice(commentIndex, 1);
                    await post.save();
                    return post;
                } else {
                    throw new AuthenticationError('Action not allowed')
                }
            }

        }
    }
}