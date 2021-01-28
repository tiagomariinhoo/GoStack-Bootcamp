import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState, useCallback } from 'react'
import { Container, TextInput, Icon } from './styles'
import { TextInputProps } from 'react-native'
import { useField } from '@unform/core'

interface InputProps extends TextInputProps {
	name: string;
	icon: string;
	containerStyle?: {};
}


interface InputValueReference {
	value: string;
}

interface InputRef {
	focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = ({ name, icon, containerStyle={}, ...rest }, ref) => {
	const inputElementRef = useRef<any>(null)
	const { registerField, defaultValue = '', fieldName, error } = useField(name)
	const inputValueRef = useRef<InputValueReference>({ value: defaultValue })

	const [isFocused, setIsFocused] = useState(false)
	const [isFilled, setIsFilled] = useState(false)

	const handleInputFocus = useCallback(() => {
		setIsFocused(true)
	}, [])

	const handleInputBlur = useCallback(() => {
		setIsFocused(false)
		setIsFilled(!!inputValueRef.current.value)
	}, [])

	/**
	 * Hook useImperativeHandle
	 * Serve para passar uma funcionalidade, uma função de um componente interno para um componente Pai
	 */
	// Isso é apenas para dar o focus para o próximo Input
	 useImperativeHandle(ref, () => ({
		 focus() {
			 inputElementRef.current.focus()
		 }
	 })) // Segundo parametro é quais informações eu quero jogar dentro da ref

	useEffect(() => {
		registerField<string>({
			name: fieldName,
			ref: inputValueRef.current,
			path: 'value',
			setValue(ref: any, value: string) {
				inputValueRef.current.value = value;
				inputElementRef.current.setNativeProps({ text: value }); //Responsável por mudar visualmente o texto do input
			},
			clearValue() { //O que vai acontecer com esse input quando o form precisar limpar ele
				inputValueRef.current.value = '';
				inputElementRef.current.clear();
			}
		})
	}, [fieldName, registerField])
	return (
		<Container style={containerStyle} isFocused={isFocused} isErrored={!!error}>
			<Icon name={icon} size={20} color={isFocused || isFilled ? '#ff9900' : '#666360'} />
			<TextInput
				ref={inputElementRef}
				keyboardAppearance="dark"
				placeholderTextColor="#666360"
				defaultValue={defaultValue}
				onFocus={handleInputFocus}
				onBlur={handleInputBlur}
				onChangeText={value => {
					inputValueRef.current.value = value
				}}
				{...rest} />
		</Container>
	)
}

export default forwardRef(Input);