'use strict';

import {gql} from 'apollo-server-express';

export default gql`
  extend type Query {
    sportTypes: [SportType]
  }
  
  extend type Mutation {
    addSportType(title: String): SportType
  }
    
  type SportType {
    id: ID
    title: String!
  }
`;