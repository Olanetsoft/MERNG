const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose')

const Post = require('./models/Post');
const { MONGODB_URL } = require('./config.js');

const typeDefs = gql`
    type Post{
        id: ID!
        body: String!
        createdAt: String!
        username: String!
    }

    type Query {
        getPosts: [Post]
    }
`;

const resolvers = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find()
                return posts;
            }
            catch (err) {
                throw new Error(err)
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to the Database')
    return server.listen({ port: 5000 });
})
    .then((res) => {
        console.log(`Server running at ${res.url}`)
    });