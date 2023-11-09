"use strict";

const { Op } = require("sequelize");
const { testTravelsFactory } = require("./factories/travelsTestData");

const testSuffix = "**test**";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    for (const travel of testTravelsFactory(100, testSuffix)) {
      const tours = travel.tours;
      delete travel.tours;
      await queryInterface.bulkInsert("travels", [travel]);
      await queryInterface.bulkInsert("tours", tours);
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete(
      "tours",
      {
        name: {
          [Op.like]: `%${testSuffix}`,
        },
      },
      {}
    );
    await queryInterface.bulkDelete(
      "travels",
      {
        name: {
          [Op.like]: `%${testSuffix}`,
        },
      },
      {}
    );
  },
};
