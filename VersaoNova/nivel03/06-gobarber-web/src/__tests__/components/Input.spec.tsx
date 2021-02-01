import { render, fireEvent, wait } from '@testing-library/react'
import React from 'react'

import Input from '../../components/Input'

jest.mock('@unform/core', () => {
    return {
        useField() {
            return {
                fieldName: 'email',
                defaultValue: '',
                error: '',
                registerField: (jest.fn())
            }
        }
    }
})

describe('Input component', () => {
    it('should be able to render an input', () => {
        const { getByPlaceholderText } = render(
            <Input name="email" placeholder="E-mail" />
        )

        // Vai checar apenas se ele existe
        /**
         * Ele dá ruim se colocar o Input fora de um Form, dá pra colocar ele dentro de um <Form> ali no teste também
         */
        expect(getByPlaceholderText('E-mail')).toBeTruthy()
    })

    it('should render highlight on input focus', async () => {
        const { getByPlaceholderText, getByTestId } = render(
            <Input name="email" placeholder="E-mail" />
        )

        const inputElement = getByPlaceholderText('E-mail')
        const containerElement = getByTestId('input-container')

        /**
         * O negócio é que lá dentro do Input, é dado um setIsFocused(true) e isso é assíncrono
         * ela não é instantanea. 
         * 
         * Sempre que a gente vai usar algo que vai demorar um pouco para a contecer, podemos utilizar o WAIT
         * 
         */

        fireEvent.focus(inputElement)

        await wait(() => {
            expect(containerElement).toHaveStyle('border-color: #ff9000')
            expect(containerElement).toHaveStyle('color: #ff9000')
        })
    })

    it('should keep input border highlight when input filled', async () => {
        const { getByPlaceholderText, getByTestId } = render(
            <Input name="email" placeholder="E-mail" />
        )

        const inputElement = getByPlaceholderText('E-mail')
        const containerElement = getByTestId('input-container')

        fireEvent.change(inputElement, {
            target: { value: 'johndoe@example.com.br' }
        })

        fireEvent.blur(inputElement)

        await wait(() => {
            expect(containerElement).toHaveStyle('color: #ff9000')
        })
    })
})