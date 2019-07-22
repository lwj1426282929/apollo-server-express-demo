require('babel-register')
const express = require('express')
const app = express()
const { ApolloServer } = require('apollo-server-express')

const typeDefs = require('./src/schema')  // 定义数据的格式，并指定从GraphQL服务器获取数据的方式
const resolvers = require('./src/resolvers')  // 定义返回数据格式及内容的方法

const server = new ApolloServer({ typeDefs, resolvers })

server.applyMiddleware({ app })

app.listen({ port: 4000 }, () => {
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
})

module.exports = app
