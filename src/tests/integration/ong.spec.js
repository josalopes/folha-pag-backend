const request = require('supertest');
const app = require('../../app');
const connection = require('../../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  })

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post("/ongs")
      //.set('authorization', 'asdfg')
      .send({
        name: "ESTEPHÂNEA PLANET",
        email: "josafa.lopes@gmail.com",
        whatsapp: "79991268620",
        city: "Fortaleza",
        uf: "CE",
      });
    
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  })
})