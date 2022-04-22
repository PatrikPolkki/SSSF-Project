'use strict';
import SportType from '../models/sportTypeModel';

export default {
  Query: {
    sportTypes: async (parent, args) => await SportType.find(),
  },
  Mutation: {
    addSportType: async (parent, args) => {
      try {
        const newSportType = new SportType(args);
        return await newSportType.save();
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};