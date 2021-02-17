import React, { useContext } from 'react'
import { View, Button, StyleSheet } from 'react-native'
import { signIn } from '../../services/auth'
import AuthContext, { useAuth } from '../../contexts/auth'

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center' }
})

const SignIn: React.FC = () => {
    const { signed, signIn } = useAuth()

    console.log(signed)

    // First one
    const handleSignIn = async () => {
        // const response = await signIn()
        // console.log(response)
        // console.log('Logar')
        signIn()
    }

    // Second one
    // const handleSignIn = () => {
    //     signIn.then((response) => {
    //       console.log('Response', response)  
    //     })
    // }

    return (
        <View style={styles.container}>
            <Button title='SignIn' onPress={handleSignIn} />
        </View>
    )
}

export default SignIn