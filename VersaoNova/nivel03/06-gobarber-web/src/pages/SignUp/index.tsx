import React, { useCallback, useRef } from 'react';

import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    console.log(formRef);

    const handleSubmit = useCallback(async (data: object) => {
        try {
            // Zerando os erros para caso ajeite depois de dar algum erro
            formRef.current?.setErrors({});
            
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('Email obrigatório').email('Digite um email válido'),
                password: Yup.string().min(6, 'No mínimo 6 digitos'),
            });
            await schema.validate(data, {
                abortEarly: false, // Retorna todos os erros de uma vez e não só o primeiro
            });
            
        } catch (err) {
            const errors = getValidationErrors(err);
            formRef.current?.setErrors(errors);
        }
    }, []);

    return (
        <Container>
        <Background />
        <Content>
            <img src={logoImg} alt="GoBarber" />

            {/* Dá para usar initialData={{'Tiago'}} para já iniciar o campo preenchido*/}
            <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Faça seu cadastro</h1>
                <Input name="name" icon={FiUser} placeholder="Nome" />
                <Input name="email" icon={FiMail} placeholder="E-mail" />
                <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
                <Button type="submit">Cadastrar</Button>
            </Form>

            <a href="login">
                <FiArrowLeft />
                Voltar para logon</a>
        </Content>
    </Container>
    );
};

export default SignUp;