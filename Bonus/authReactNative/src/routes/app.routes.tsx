/**
 * Routes that the user can navigate when authenticated
 */

import React from 'react'
import Dashboard from '../pages/Dashboard'

// When user press back button, will get the page on top of the stack
import { createStackNavigator } from '@react-navigation/stack'

const AppStack = createStackNavigator()

const AppRoutes: React.FC = () => {
    return <AppStack.Navigator>
        <AppStack.Screen name="Dashboard" component={Dashboard}/> 
    </AppStack.Navigator>
}

export default AppRoutes