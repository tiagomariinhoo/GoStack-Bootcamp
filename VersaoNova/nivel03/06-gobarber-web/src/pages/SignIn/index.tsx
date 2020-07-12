import React, { useRef, useCallback, useContext } from 'react';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {AuthContext, useAuth} from '../../hooks/AuthContext';
import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    // É basicamente um Hook
    // const auth = useContext(AuthContext);
    // Toda variável externa que vem do useCallback
    // useContext etc, tem que ser colocada nas 
    // Dependências []
    const { signIn, user } = useAuth();

    console.log(user);

    interface SignInFormData {
        email: string;
        password: string;
    }

    const handleSubmit = useCallback(async (data: SignInFormData) => {
        try {
            // Zerando os erros para caso ajeite depois de dar algum erro
            formRef.current?.setErrors({});
            
            const schema = Yup.object().shape({
                email: Yup.string().required('Email obrigatório').email('Digite um email válido'),
                password: Yup.string().required('Senha obrigatória'),
            });
            await schema.validate(data, {
                abortEarly: false, // Retorna todos os erros de uma vez e não só o primeiro
            });
            signIn({
                email: data.email,
                password: data.password,
            });
        } catch (err) {
            const errors = getValidationErrors(err);
            formRef.current?.setErrors(errors);
        }
    }, [signIn]);

    return (
        <Container>
            <Content>
                <img src={logoImg} alt="GoBarber" />
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu logon</h1>
                    <Input name="email" icon={FiMail} placeholder="E-mail" />
                    <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
                    <Button type="submit">Entrar</Button>

                    <a href="forgot">Esqueci minha senha</a>
                </Form>

                <a href="login">
                    <FiLogIn />
                    Criar conta</a>
            </Content>
            <Background />
        </Container>
    );
};

export default SignIn;