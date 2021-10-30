const express = require('express');
const { authMiddleware } = require('./utils/auth');

const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');

const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async () => {
  //create apollo server to take data
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
  });

    //start server
    await server.start();

    //integrate apollo server w express app ad middleware
    server.applyMiddleware({ app });

    console.log(`use graphQL at http://localhost:${PORT}${server.graphqlPath}`)
};

//init apollo server
startServer();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
