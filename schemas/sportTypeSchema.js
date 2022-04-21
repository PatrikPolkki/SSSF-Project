'use strict';

import {gql} from 'apollo-server-express';

export default gql`
  extend type Query {
    sportTypes: [SportType]
  }
    
  type SportType {
    id: ID
    title: String
  }
  
  input SportTypeInput {
    id: ID
    title: String
  }
`;