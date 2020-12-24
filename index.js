const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
// const { MONGODB_URL } = require("./config.js");

//using the dotenv variable
dotenv.config({ path: "./config.env" });

// const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

// mongoose
//   .connect(process.env.MONGODB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to the Database");
//     return server.listen({ port: PORT });
//   })
//   .then((res) => {
//     console.log(`Server running at ${res.url}`);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("DB Connected successfully🎉");
  });

// console.log(process.env);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
