import supertest from 'supertest';
import { it, describe } from '@jest/globals';
import { v4 as uuid } from 'uuid';
import app from '../src/app';

let data: { [key: string]: string | number | string[] }[];
try {
  data = require('../data/database.json');
} catch (err) {
  data = [];
}

const IDs = data.map((e) => e.id);

// GET - All
describe('Get Data in Database', () => {
  it('Should get all data in database if it exists', async () => {
    if (data.length > 0) {
      await supertest(app)
        .get('/api/')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/);
    }
  });

  it("Should return 404 if data doesn't exist", async () => {
    if (data.length === 0) {
      await supertest(app)
        .get('/api/')
        .set('Accept', 'application/json')
        .expect(404);
    }
  });
});

// GET - Single
describe('Get Single Data', () => {
  it('Should return if id is valid', async () => {
    const id: number | string = uuid();
    if (IDs.includes(id)) {
      await supertest(app)
        .get(`/api/${id}`)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/);
    }
  });

  it('Should return 404 if id is invalid', async () => {
    const id: number | string = uuid();
    if (!IDs.includes(id)) {
      await supertest(app)
        .get(`/api/${id}`)
        .set('Accept', 'application/json')
        .expect(404)
        .expect('Content-Type', /json/);
    }
  });
});

// POST
describe('Post Data', () => {
  it('Should create new data if validation is correct', async () => {
    const Data = {
      organization: 'node ninja',
      products: ['developers', 'pizza'],
      marketValue: '90%',
      address: 'sangotedo',
      ceo: 'cn',
      country: 'Taiwan',
      noOfEmployees: 2,
      employees: ['james bond', 'jackie chan'],
    };
    await supertest(app)
      .post('/api/')
      .send(Data)
      .set('Accept', 'application/json')
      .expect(201)
      .expect('Content-Type', /json/);
  });

  it('Should return 403 for wrong validation', async () => {
    await supertest(app)
      .post('/api/')
      .set('Accept', 'application/json')
      .expect(403);
  });
});

// PUT
describe('Update Data', () => {
  const id: number | string = uuid();
  const Data = {
    id: uuid(),
    organization: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    products: [],
    marketValue: '',
    address: '',
    ceo: '',
    country: '',
    noOfEmployees: 1,
    employees: [],
  };
  it('Should update existing data that matches id', async () => {
    if (IDs.includes(id)) {
      await supertest(app)
        .put(`/api/${id}`)
        .send(Data)
        .set('Accept', 'application/json')
        .expect(201)
        .expect('Content-Type', /json/);
    }
  });

  it('Should return 404 if id does not exist', async () => {
    if (!IDs.includes(id)) {
      await supertest(app)
        .put(`/api/${id}`)
        .send(Data)
        .set('Accept', 'application/json')
        .expect(404)
        .expect('Content-Type', /json/);
    }
  });
});

// Delete
describe('Delete Data', () => {
  const id: number | string = uuid();
  it('should delete data if id exist', async () => {
    if (IDs.includes(id)) {
      await supertest(app)
        .delete(`/api/${id}`)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/);
    }
  });

  it("should return 404 if id doesn't exist", async () => {
    if (!IDs.includes(id)) {
      await supertest(app)
        .delete(`/api/${id}`)
        .set('Accept', 'application/json')
        .expect(404)
        .expect('Content-Type', /json/);
    }
  });
});
