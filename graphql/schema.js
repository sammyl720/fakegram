const { buildSchema } = require('graphql')

module.exports = buildSchema(`
  type Query {
    users: [User!]!
    me: User!
    user(id: ID): User!
    hello: String!
    posts: [Post!]!
    myPosts: [Post!]!
  }

  type Mutation {
    createUser(data: CreateUserInput): User!
    EditUser(data: EditUserInput): User!
    loginUser(data: LoginUserInput!): UserWithToken!
    likePost(id: ID): Post!
    createPost(data: CreatePostInput): Post!
    updatePost(id: ID!, data: UpdatePostInput): Post!
    deletePost(id: ID!): Post!
  }
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]
    profileUrl: String
    age: Int
  }

  input EditUserInput{
    name: String
    email: String
    profileUrl: String
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
    likes: [UserLike!]!
    likeCount: Int
  }
  type UserLike {
    id: ID!
    name: String
    profileUrl: String
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
