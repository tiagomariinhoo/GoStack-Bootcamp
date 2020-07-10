import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';
// interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
// }

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>; // Mesma coisa de usar a interface anterior

const Button: React.FC<ButtonProps> = ({ children, ...rest}) => (
    <Container type="button" {...rest}>
        {children}
    </Container>
);

export default Button;