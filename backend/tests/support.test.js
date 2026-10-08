const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const Support = require('../src/models/Support');

const TEST_MONGO_URI = process.env.MONGO_URI_TEST || process.env.MONGO_URI;

beforeAll(async () => {
  // Ensure connected to test database
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(TEST_MONGO_URI);
  }
  await Support.deleteMany({});
  await Support.syncIndexes();
});

afterAll(async () => {
  await Support.deleteMany({});
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Support.deleteMany({});
});

describe('Backend API Test Suite', () => {
  
  // Test 9: Health endpoint
  test('GET /api/health returns 200 with service status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      status: 'ok',
      service: 'sashwat-campaign-api',
    });
  });

  // Test 1: GET /api/support with zero records
  test('GET /api/support returns 0 when no support records exist', async () => {
    const res = await request(app).get('/api/support');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ count: 0 });
  });

  // Test 2 & 4: POST first support and count increments correctly
  test('POST /api/support successfully creates record and increments count to 1', async () => {
    const visitorId = 'visitor-alpha-12345';
    const res = await request(app)
      .post('/api/support')
      .send({ visitorId });

    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      success: true,
      supported: true,
      count: 1,
    });

    const doc = await Support.findOne({ visitorId });
    expect(doc).not.toBeNull();
    expect(doc.visitorId).toBe(visitorId);
    expect(doc._id).toBeDefined();

    // Verify low-level MongoDB driver document existence in actual collection
    const rawDoc = await mongoose.connection.db.collection(Support.collection.collectionName).findOne({ visitorId });
    expect(rawDoc).not.toBeNull();
    expect(rawDoc.visitorId).toBe(visitorId);

    // Verify GET /api/support reflects count of 1
    const getRes = await request(app).get('/api/support');
    expect(getRes.body.count).toBe(1);
  });

  // Test 3: POST duplicate support returns alreadySupported without incrementing count
  test('POST /api/support with existing visitorId returns alreadySupported and preserves count', async () => {
    const visitorId = 'visitor-beta-67890';

    // First request
    const firstRes = await request(app)
      .post('/api/support')
      .send({ visitorId });
    expect(firstRes.status).toBe(201);
    expect(firstRes.body.count).toBe(1);

    // Duplicate request
    const dupRes = await request(app)
      .post('/api/support')
      .send({ visitorId });

    expect(dupRes.status).toBe(200);
    expect(dupRes.body).toEqual({
      success: true,
      supported: false,
      alreadySupported: true,
      count: 1,
    });

    // Verify total documents remain 1
    const total = await Support.countDocuments();
    expect(total).toBe(1);
  });

  // Test 5: Invalid visitorId format
  test('POST /api/support rejects malformed visitorId with 400', async () => {
    const res = await request(app)
      .post('/api/support')
      .send({ visitorId: 'bad!@#' });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/valid visitorId is required/i);
  });

  // Test 6: Missing visitorId
  test('POST /api/support rejects missing visitorId with 400', async () => {
    const res = await request(app)
      .post('/api/support')
      .send({});

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/valid visitorId is required/i);
  });

  // Test 7: MongoDB duplicate-key protection (handles concurrent duplicate creation gracefully)
  test('MongoDB unique index enforces uniqueness at database layer', async () => {
    const visitorId = 'unique-visitor-test-key';
    await Support.create({ visitorId });

    // Attempt direct database duplicate insertion
    await expect(Support.create({ visitorId })).rejects.toThrow();
  });

  // Test 8: Rate limiting
  test('POST /api/support enforces rate limit after exceeding threshold', async () => {
    // Send 11 rapid requests from test agent (limit is 10/min)
    const promises = [];
    for (let i = 1; i <= 12; i++) {
      promises.push(
        request(app)
          .post('/api/support')
          .send({ visitorId: `rate-limit-test-id-${i}` })
      );
    }

    const responses = await Promise.all(promises);
    const rateLimitedResponses = responses.filter((r) => r.status === 429);
    expect(rateLimitedResponses.length).toBeGreaterThan(0);
    expect(rateLimitedResponses[0].body.success).toBe(false);
    expect(rateLimitedResponses[0].body.message).toMatch(/too many support requests/i);
  });

  // Test 10: Centralized error handling and unknown routes
  test('Unknown route triggers 404 handler', async () => {
    const res = await request(app).get('/api/unknown-endpoint');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/Resource not found/i);
  });
});
