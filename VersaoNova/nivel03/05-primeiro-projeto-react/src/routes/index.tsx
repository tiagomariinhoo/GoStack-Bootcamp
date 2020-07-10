import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';

const Routes: React.FC = () => (
    // Esse + depois de repository é que tudo que vier depois da /
    // Será pertencente ao repository
 <Switch>
     <Route path="/" exact component={Dashboard} />
     <Route path="/repositories/:repository+" component={Repository} />
 </Switch>   
)

export default Routes;