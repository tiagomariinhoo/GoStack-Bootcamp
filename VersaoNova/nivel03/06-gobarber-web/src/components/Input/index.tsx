import React, { InputHTMLAttributes, useEffect, useRef, useState, useCallback } from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';
import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const { fieldName, defaultValue, error, registerField } = useField(name);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true)
    }, []);

    // Estudar mais sobre o uso de hooks e o useCallback
    // Sempre que for criar uma função dentro de um componente
    // Utiliza o useCallback
    // Isso é parar fazer com que a função só seja criada uma vez
    const handleInputBlur = useCallback(() => {
        setIsFocused(false);

        setIsFilled(!!inputRef.current?.value);
    }, []);

    useEffect(() => {
        registerField({
            name: fieldName, // Nome do campo
            ref: inputRef.current, // Referência para o iinput
            path: 'value'
        });
    }, [fieldName, registerField]);

    return (
        <Container isFilled={isFilled} isFocused={isFocused}>
        {Icon && <Icon size={20}/>}
        <input 
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            defaultValue={defaultValue} 
            ref={inputRef} 
            {...rest} />
        </Container>
    );
};

export default Input;