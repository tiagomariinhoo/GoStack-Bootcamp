import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import SignIn from '../../pages/SignIn'

const mockedHistoryPush = jest.fn()
const mockedSignIn = jest.fn()
const mockedAddToast = jest.fn()

jest.mock('react-router-dom', () => {
    return {
        useHistory: () => ({
            push: mockedHistoryPush //Basicamente quando essa função for disparada, vai returnar um push com uma função vazia
        }), // Função vazia que não faz nada, só pra saber se a função foi chamada
        Link: ({ children }: { children: React.ReactNode }) => children
    }
})

// Describe indica a categoria do teste
/**
 * Importante: Quando faz os testes no frontend, não podemos depender da API
 * então nós podemos fazer um MOCK, uma API fictícia
 */

jest.mock('../../hooks/auth', () => {
    return {
        useAuth: () => ({
            signIn: mockedSignIn,
        }),
    };
})

jest.mock('../../hooks/toast', () => {
    return {
        useToast: () => ({
            addToast: mockedAddToast,
        }),
    }
})

describe('SignIn Page', () => {
    beforeEach(() => {
        mockedHistoryPush.mockClear() // É importante limpar porque no primeiro teste é disparado o history nela e no segunda não
    })

    it('should be able to sign in', async () => {

        const { debug, getByPlaceholderText, getByText } = render(<SignIn />)

        const emailField = getByPlaceholderText('E-mail') // Retorna a referência para esse elemento dentro do html
        const passwordField = getByPlaceholderText('Senha')

        const buttonElement = getByText('Entrar')

        //FireEvent simula uma interação que o usuário teria com a tela

        // fireEvent.change digitar dentro de um input
        fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } })
        fireEvent.change(passwordField, { target: { value: '123456' } })

        fireEvent.click(buttonElement)

        await wait(() => {
            expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard')
        })

        /**
         * Precisamos agora se o history.push foi disparado depois de fazer o login
         * 
         * É preciso também evitar que o signIn faça uma chamada a api, então temos que mockar o useAuth
         * Por enquanto isso testa apenas o visual de signIn, a parte de autenticação com a api, é feita pelo useAuth
         * Então é melhor testar esse hook separadamente depois
         */

        // debug() // Dá um console.log do html ali dentro

    })

    it('should be not able to sign in with invalid credentials', async () => {

        const { debug, getByPlaceholderText, getByText } = render(<SignIn />)

        const emailField = getByPlaceholderText('E-mail')
        const passwordField = getByPlaceholderText('Senha')

        const buttonElement = getByText('Entrar')

        fireEvent.change(emailField, { target: { value: 'not-valid-email' } })
        fireEvent.change(passwordField, { target: { value: '123456' } })

        fireEvent.click(buttonElement)

        await wait(() => {
            expect(mockedHistoryPush).not.toHaveBeenCalled()
        })
    })

    it('should display an error if login fails', async () => {
        mockedSignIn.mockImplementation(() => {
            throw new Error();
        });

        const { getByPlaceholderText, getByText } = render(<SignIn />);

        const emailField = getByPlaceholderText('E-mail');
        const passwordField = getByPlaceholderText('Senha');
        const buttonElement = getByText('Entrar');

        fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
        fireEvent.change(passwordField, { target: { value: '123456' } });

        fireEvent.click(buttonElement);

        await wait(() => {
            expect(mockedAddToast).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: 'error',
                }),
            )
        })
    });
})