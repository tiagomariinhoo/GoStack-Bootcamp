import React, { useContext } from 'react'
import { View, Button, StyleSheet } from 'react-native'
import { signIn } from '../../services/auth'
import AuthContext, { useAuth } from '../../contexts/auth'

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center' }
})

const Dashboard: React.FC = () => {
    const { signOut, user } = useAuth()

    const handleSignOut = async () => {
        signOut()
    }

    return (
        <View style={styles.container}>
            <Button title='Logout' onPress={handleSignOut} />
        </View>
    )
}

export default Dashboard