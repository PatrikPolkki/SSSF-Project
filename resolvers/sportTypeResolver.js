'use strict';
import SportType from '../models/sportTypeModel';

export default {
  Post: {
    sport: async (parent, args) => {
      return SportType.findById(parent.sport);
    },
  },
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