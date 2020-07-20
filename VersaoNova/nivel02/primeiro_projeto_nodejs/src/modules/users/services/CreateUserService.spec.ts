import 'reflect-metadata'
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

// test('sum two numbers', () => {
//   expect(1+2).toBe(3);
// });

// Cria como se fosse uma categoria
describe('CreateAppointment', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(
      fakeUsersRepository
    );

    const user = await createUser.execute({
      name: 'Teste teste',
      email: 'teste@email.com',
      password: '123456'
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(
      fakeUsersRepository
    );

    await createUser.execute({
      name: 'Teste teste',
      email: 'teste@email.com',
      password: '123456'
    });

    expect(
      createUser.execute({
        name: 'Teste teste',
        email: 'teste@email.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
