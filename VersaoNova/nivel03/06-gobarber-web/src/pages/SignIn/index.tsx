import React, { useRef, useCallback, useContext } from 'react';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';

import { Link, useHistory } from 'react-router-dom';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAuth} from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import { Container, Content, AnimationContainer, Background } from './styles';

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    // É basicamente um Hook
    // const auth = useContext(AuthContext);
    // Toda variável externa que vem do useCallback
    // useContext etc, tem que ser colocada nas 
    // Dependências []
    const { signIn } = useAuth();
    const { addToast } = useToast();
    const history = useHistory();

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
            await signIn({
                email: data.email,
                password: data.password,
            });

            history.push('/dashboard');
        } catch (err) {
            if(err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);

                return ;
            }
            addToast({
                type: 'error',
                title: 'Erro na autenticação',
                description: 'Ocorreu um erro ao fazer login, cheque as credenciais',
            });
        }
    }, [signIn, addToast, history]);

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="GoBarber" />
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Faça seu logon</h1>
                        <Input name="email" icon={FiMail} placeholder="E-mail" />
                        <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
                        <Button type="submit">Entrar</Button>

                        <a href="forgot">Esqueci minha senha</a>
                    </Form>

                    <Link to="/signup">
                        <FiLogIn />
                        Criar conta
                        </Link>
                </AnimationContainer>
            </Content>
            <Background />
        </Container>
    );
};

export default SignIn;