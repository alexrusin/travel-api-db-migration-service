const { faker } = require("@faker-js/faker");

function createTours(travelId, number, testSuffix) {
  return (
    Array(number)
      .fill(1)
      .map((n, i) => n + i)
      // eslint-disable-next-line no-unused-vars
      .map((item) => {
        const tourDates = faker.date.betweens({
          from: "2023-11-01",
          to: "2023-11-03",
          count: 2,
        });
        return {
          id: faker.string.uuid(),
          travel_id: travelId,
          name: `${faker.lorem.words(4)} ${testSuffix}`,
          starting_date: tourDates[0],
          ending_date: tourDates[1],
          price: faker.number.float({ min: 10, max: 50, precision: 0.01 }),
        };
      })
  );
}

const testTravelsFactory = function* (number, testSuffix) {
  const array = Array(number)
    .fill(1)
    .map((n, i) => n + i);

  // eslint-disable-next-line no-unused-vars
  for (const item of array) {
    const id = faker.string.uuid();
    yield {
      id,
      name: `${faker.lorem.words(3)} ${testSuffix}`,
      description: faker.lorem.sentence(),
      slug: faker.lorem.slug(4),
      is_public: faker.datatype.boolean(0.7),
      number_of_days: faker.number.int({ min: 2, max: 14 }),
      tours: createTours(id, faker.number.int({ min: 1, max: 5 }), testSuffix),
    };
  }
};

module.exports = {
  testTravelsFactory,
};
