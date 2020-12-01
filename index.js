const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');


const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers')
const { MONGODB_URL } = require('./config.js');



const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
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