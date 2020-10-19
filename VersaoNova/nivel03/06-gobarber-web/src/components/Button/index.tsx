import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';
// interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
// }

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean;
}; // Mesma coisa de usar a interface anterior

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest}) => (
    <Container type="button" {...rest}>
        {loading ? 'Carregando...' : children}
    </Container>
);

export default Button;