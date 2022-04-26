'use strict';

import {gql} from 'apollo-server-express';

export default gql`
  extend type Query {
    posts: [Post]
    post(id: ID!): Post
  }
  
  extend type Mutation {
    addPost(postInfo: PostInfo): Post
    updatePost(id: ID!, postInfo: PostInfo): Post
    deletePost(id: ID!): Post
    applyToPost(id: ID!, participantIDd: ID!): Post
    leaveFromPost(id: ID!, participantId: ID!): Post  
  }
  
  type Post {
    id: ID
    owner: User
    title: String
    description: String
    location: String
    date: String
    sport: SportType
    participants: [User]
  }
  
  input PostInfo {
    owner: ID
    title: String
    description: String
    location: String
    date: String
    sport: ID
    participants: [ID]
   }
`;