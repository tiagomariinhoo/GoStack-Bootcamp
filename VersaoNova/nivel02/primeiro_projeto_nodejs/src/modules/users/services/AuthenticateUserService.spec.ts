import 'reflect-metadata'
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

// test('sum two numbers', () => {
//   expect(1+2).toBe(3);
// });
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

// Cria como se fosse uma categoria
describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
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
      expect(
        authenticateUser.execute({
          email: 'teste@email.com',
          password: '123456'
        })
      ).rejects.toBeInstanceOf(AppError);

  });

  it('should not be able to authenticate with wrong password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Teste teste',
      email: 'teste@email.com',
      password: '123456'
    })

    await expect(
      authenticateUser.execute({
        email: 'teste@email.com',
        password: 'wrong-password'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

});
