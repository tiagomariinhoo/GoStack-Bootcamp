import 'reflect-metadata'
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

// test('sum two numbers', () => {
//   expect(1+2).toBe(3);
// });

// Cria como se fosse uma categoria
describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const user = await createUser.execute({
      name: 'Teste teste',
      email: 'teste@email.com',
      password: '123456'
    })

    const response = await authenticateUser.execute({
      email: 'teste@email.com',
      password: '123456'
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with a non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

      expect(
        authenticateUser.execute({
          email: 'teste@email.com',
          password: '123456'
        })
      ).rejects.toBeInstanceOf(AppError);

  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const user = await createUser.execute({
      name: 'Teste teste',
      email: 'teste@email.com',
      password: '123456'
    })

    expect(
      authenticateUser.execute({
        email: 'teste@email.com',
        password: 'wrong-password'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

});
