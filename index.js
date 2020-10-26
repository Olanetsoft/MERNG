const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose')

const { MONGODBURL } = require('./config.js');

const typeDefs = gql`
    type Query {
        sayHi: String!
    }
`;

const resolvers = {
    Query: {
        sayHi: () => 'Hello World!'
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MONGODBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to the Database')
    return server.listen({ port: 5000 });
})
    .then((res) => {
        console.log(`Server running at ${res.url}`)
    });