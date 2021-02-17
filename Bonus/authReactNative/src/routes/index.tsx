/**
 * Will control which stack will be available for us
 * 
 * Just to check if the use is logged in
 */

import React, { useContext } from 'react'
import AppRoutes from './app.routes'
import AuthRoutes from './auth.routes'

import {useAuth} from '../contexts/auth'
import { ActivityIndicator, View } from 'react-native'

const Routes: React.FC = () => {
    const { signed, loading } = useAuth()

    if(loading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#666" />
            </View>
        )
    }

    return(
        signed ? <AppRoutes /> : <AuthRoutes />
    )
}

export default Routes