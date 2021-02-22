import React from 'react'
import { Switch, Route } from 'react-router-dom'

import FacebookLayout from '../pages/FacebookLayout'
import Games from '../pages/Games'
import Main from '../pages/Main'

const Routes: React.FC = () => {

    return < Switch >
        <Route path='/' exact component={Main} />
        <Route path='/facebook' exact component={FacebookLayout} />
        <Route path='/games' exact component={Games} />
    </Switch >
}

export default Routes