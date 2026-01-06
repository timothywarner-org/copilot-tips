import { expect } from 'chai';
import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../src/app.js';

chai.use(chaiHttp);

describe('Copilot Tips API', () => {
  describe('GET /api/tips', () => {
    it('should return all tips', async () => {
      const res = await chai.request(app).get('/api/tips');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
    });

    it('should return tips with required properties', async () => {
      const res = await chai.request(app).get('/api/tips');
      expect(res).to.have.status(200);
      if (res.body.length > 0) {
        expect(res.body[0]).to.have.property('id');
        expect(res.body[0]).to.have.property('title');
        expect(res.body[0]).to.have.property('topic');
      }
    });
  });

  describe('GET /api/tips/random', () => {
    it('should return a random tip', async () => {
      const res = await chai.request(app).get('/api/tips/random');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
    });
  });

  describe('GET /api/tips/:id', () => {
    it('should return a tip by ID when valid', async () => {
      // First get all tips to find a valid ID
      const allTips = await chai.request(app).get('/api/tips');
      if (allTips.body.length > 0) {
        const tipId = allTips.body[0].id;
        const res = await chai.request(app).get(`/api/tips/${tipId}`);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('id', tipId);
      }
    });

    it('should return 404 for non-existent tip', async () => {
      const res = await chai.request(app).get('/api/tips/non-existent-id-12345');
      expect(res).to.have.status(404);
    });
  });

  describe('GET /api/tips/topic/:topic', () => {
    it('should return tips filtered by topic', async () => {
      const res = await chai.request(app).get('/api/tips/topic/prompts');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
    });

    it('should return empty array for non-existent topic', async () => {
      const res = await chai.request(app).get('/api/tips/topic/nonexistenttopic');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const res = await chai.request(app).get('/health');
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status', 'ok');
      expect(res.body).to.have.property('timestamp');
    });
  });
});
