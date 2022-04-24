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
    applyToPost(id: ID!, participantID: ID!): Post
  }
  
  type Post {
    id: ID
    owner: User
    title: String
    description: String
    location: PointObject
    sport: SportType
    participants: [User]
  }
  
  input PointObjectInput {
    coordinates: [Float]
  }

  type PointObject {
    coordinates: [Float]
    type: String
  }
  
  input PostInfo {
    owner: ID
    title: String
    description: String
    location: PointObjectInput
    sport: ID
    participants: [ID]
   }
`;