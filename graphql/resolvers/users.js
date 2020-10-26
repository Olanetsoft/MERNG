const User = require('../../models/User');

module.exports = {
    Mutation: {
        async register(_, { registerInput: { username, email, password, confirmPassword } }, context, info) {
            // TODO Validate User data

            // TODO Make sure user don't already exist

            // TODO hash password and create an auth token
        }
    }
}