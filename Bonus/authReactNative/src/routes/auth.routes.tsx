/**
 * Routes that the user can navigate when not authenticated
 */

 import React from 'react'
 import SignIn from '../pages/SignIn'

 // When user press back button, will get the page on top of the stack
 import { createStackNavigator } from '@react-navigation/stack'

 const AuthStack = createStackNavigator()

 const AuthRoutes: React.FC = () => {
     return <AuthStack.Navigator>
         <AuthStack.Screen name="SignIn" component={SignIn}/> 
     </AuthStack.Navigator>
 }

export default AuthRoutes