'use strict';
import SportType from '../models/sportTypeModel';

export default {
  Query: {
    sportTypes: async (parent, args) => await SportType.find(),
  },
};