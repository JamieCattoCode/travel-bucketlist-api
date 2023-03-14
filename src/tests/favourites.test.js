const { expect } = require('chai');
const request = require('supertest');
const { Favourite } = require('../models');
const app = require('../app');

describe('/favourites', () => {
    before(async () => await Favourite.sequelize.sync());

    beforeEach(async () => {
        await Favourite.destroy({ where: {} });
    });

    describe('with no records in the database', () => {
        describe('POST /favourites', () => {
            it('creates a new favourite in the databse', async () => {
                const response = await request(app).post('/favourites').send({
                    UserId: 3,
                    DestinationId: 4
                });

                expect(response.status).to.equal(201);
                expect(response.UserId).to.equal(3);
                expect(response.DestinationId).to.equal(4);
            });
        });
    });

    describe('with records in the database', () => {
        let favourites;

        beforeEach(async () => {
            favourites = await Promise.all([
                Favourite.create({UserId: 1, DestinationId: 1}),
                Favourite.create({UserId: 2, DestinationId: 2}),
                Favourite.create({UserId: 3, DestinationId: 3})
            ]);
        });

        describe('GET /favourites', () => {
            it('returns all favourites records in the table', async () => {
                const response = await request(app).get('/favourites');

                expect(response.status).to.equal(200);
                expect(response.body.length).to.equal(3);
                response.body.forEach((favourite) => {
                    const expected = favourite.find((a) => a.id === favourite.id);

                    expect(favourite.UserId).to.equal(expected.UserId);
                    expect(favourite.DestinationId).to.equal(expected.DestinationId);
                });
            });
            // const favourite = favourites[0];
        })
    })
});