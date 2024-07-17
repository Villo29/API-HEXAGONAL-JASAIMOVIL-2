import request from 'supertest';
import app from '../src/infrastructure/index'; // Asegúrate de que la ruta es correcta

describe('Usuario Controller', () => {
  it('should return 200 OK for a valid user', async () => {
    const response = await request(app)
      .post('/api/usuario')
      .send({ username: 'validUser', password: 'validPassword' });
    expect(response.status).toBe(200);
  });

  it('should return 400 Bad Request for an invalid user', async () => {
    const response = await request(app)
      .post('/api/usuario')
      .send({ username: '', password: '' });
    expect(response.status).toBe(400);
  });
});