const { expect } = require('chai');
const request = require('supertest');
const { User } = require('../models');
const app = require('../app');

describe('/users', () => {
    before(async () => await User.sequelize.sync());

    beforeEach(async () => {
        await User.destroy({ where: {} });
    });

    describe('with no records in the database', () => {
        describe('POST /users', () => {
          it('creates a new user in the database', async () => {
            const response = await request(app).post('/users').send({
              username: 'JamieCatto',
              email: 'jamietcatto@gmail.com',
              password: 'password123'
            });
            
            expect(response.status).to.equal(201);
            expect(response.body.password).to.equal(undefined);
          });
        });
      });

    describe('with records in the database', () => {
      let users;

      beforeEach(async () => {
        users = await Promise.all([
          User.create({ username: "JamieCatto", email: "jamietcatto@gmail.com",
          password: 'password123' }),
          User.create({ username: "JoshBamford", email: "joshbam@gmail.com",
          password: 'password123' }),
          User.create({ username: "TestUser123", email: "testuser@gmail.com",
          password: 'password123' }),
        ]);
      });

      describe('GET /users', () => {

        it('gets a user with a correct username query', async () => {
          const user = users[0];
          const response = await request(app).get(`/users?username=${user.username}`);

          console.log(response.body);

          expect(response.status).to.equal(200);
          expect(response.body.username).to.equal(user.username);
          expect(response.body.email).to.equal(user.email);
        });

        it('returns a 404 with an incorrect username query', async () => {
          const response = await request(app).get('/users?username=qwerty123');

          console.log(response.body);

          expect(response.status).to.equal(404);
          expect(response.body.message).to.equal("user 'qwerty123' does not exist.");
        });

        it('gets all users in the database', async () => {
          const response = await request(app).get('/users');
          
          expect(response.status).to.equal(200);
          expect(response.body.length).to.equal(3);
          response.body.forEach((user) => {
            const expected = users.find((a) => a.id === user.id);

            expect(user.username).to.equal(expected.username);
            expect(user.email).to.equal(expected.email);
          });
        });
      });

      describe('GET /users/:id', () => {
        it('gets a user by their id', async () => {
          const user = users[0];
          const response = await request(app).get(`/users/${user.id}`);

          expect(response.status).to.equal(200);
          expect(response.body.username).to.equal(user.username);
          expect(response.body.email).to.equal(user.email);
        });

        it('returns a 404 if their is no user with that id', async () => {
          const response = await request(app).get('/users/9999999');

          expect(response.status).to.equal(404);
          expect(response.body.message).to.equal('user 9999999 does not exist.');
        });
      });

      describe('PATCH /users/:id', () => {
        it('updates a user\'s record by their id', async () => {
          const user = users[0];
          const response = await request(app).patch(`/users/${user.id}`).send({
            username: "JamieCatto8"
          });

          expect(response.status).to.equal(200);
          expect(response.body.id).to.equal(user.id);
          expect(response.body.email).to.equal(user.email);
          expect(response.body.username).to.equal('JamieCatto8');
        });

        it('returns a 404 if there is no user with that id', async () => {
          const response = await request(app).patch('/users/9999999').send({
            username: "JamieCatto8"
          });

          expect(response.status).to.equal(404);
          expect(response.body.message).to.equal('user 9999999 does not exist.');
        });
      });

      describe('DELETE /users/:id', () => {
        it('deletes a user by id', async () => {
          const user = users[0];
          const response = await request(app).delete(`/users/${user.id}`);

          const deletedUser = await User.findByPk(user.id, { raw: true });
          expect(response.status).to.equal(204);
          expect(deletedUser).to.equal(null);
        });

        it('returns a 404 if there is no user with that id', async () => {
          const response = await request(app).delete('/users/9999999');

          expect(response.status).to.equal(404);
          expect(response.body.message).to.equal('user 9999999 does not exist.');
        });
      });
    });
});