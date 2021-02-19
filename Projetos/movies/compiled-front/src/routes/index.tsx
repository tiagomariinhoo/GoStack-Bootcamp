import React from 'react'
import { Switch, Route } from 'react-router-dom'

import FacebookLayout from '../pages/FacebookLayout'
import Main from '../pages/Main'

const Routes: React.FC = () => (
    <Switch>
        <Route path='/' exact component={Main} />
        <Route path='/facebook' exact component={FacebookLayout} />
    </Switch>
)

export default Routes