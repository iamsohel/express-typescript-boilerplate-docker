import request from 'supertest';
import { app } from '../../app';
import { User } from '../../entity/User';
import { AppDataSource } from '../../DataSource';

const userRepo = AppDataSource.getRepository(User);

beforeAll(async () => {
  const db = await AppDataSource.initialize();
  await userRepo.clear();
});

it('should success', async () => {
  await request(app).get('/api/v1/auth/test').expect(200);
});

it('should register successfully', async () => {
  const email = 'teds2t2@test.com';
  const password = 'password';
  const first_name = 'sohel';
  const last_name = 'rana';

  const response = await request(app)
    .post('/api/v1/auth/register')
    .send({
      email,
      password,
      first_name,
      last_name,
    })
    .expect(200);
});

it('should login successfully', async () => {
  const email = 'teds2t2@test.com';
  const password = 'password';

  const response = await request(app)
    .post('/api/v1/auth/sign-in')
    .send({
      email,
      password,
    })
    .expect(200);
});

afterAll(async () => {
  await userRepo.clear();
  await AppDataSource.destroy();
});
