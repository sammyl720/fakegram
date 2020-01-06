const { buildSchema } = require('graphql')

module.exports = buildSchema(`
  type Query {
    users: [User!]!
    user(id: ID): User!
    hello: String!
    posts: [Post!]!
    myPosts: [Post!]!
  }
  type Mutation {
    createUser(data: CreateUserInput): User!
    loginUser(data: LoginUserInput): UserWithToken!
    createPost(data: CreatePostInput): Post!
    updatePost(id: ID!, data: UpdatePostInput): Post!
    deletePost(id: ID!): Post!
  }
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }
  type Post {
    id: ID!
    title: String!
    description: String
    imageUrl:String
    published: Boolean!
    datetime: String
    user: User!
  }
  input CreatePostInput {
    title: String!
    description: String
    imageUrl:String
    published: Boolean
  }
  input UpdatePostInput {
    title: String
    description: String
    imageUrl:String
    published: Boolean
  }
  type UserWithToken {
    token: String!
    user: User!
  }
  input CreateUserInput {
    name: String!
    email: String!
    password: String!
    age: Int
  }
  input LoginUserInput {
    email: String!
    password: String!
  }
`)