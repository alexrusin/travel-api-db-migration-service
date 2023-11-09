"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("tours", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      travel_id: {
        type: Sequelize.UUID,
        references: {
          model: "travels",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      starting_date: {
        type: Sequelize.DATEONLY,
      },
      ending_date: {
        type: Sequelize.DATEONLY,
      },
      price: {
        type: Sequelize.DECIMAL(10, 4),
        allowNull: false,
        defaultValue: 0,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
    await queryInterface.addIndex("tours", ["travel_id"]);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("tours");
  },
};
