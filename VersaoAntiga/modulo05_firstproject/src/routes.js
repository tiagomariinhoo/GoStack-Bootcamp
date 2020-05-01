import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

/**
 * Dentro do React tudo é componente
 *
 * Com o exact ele chama o componente Main exatamente com essa rota
 */

import Main from './pages/Main';
import Repository from './pages/Repository';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/repository/:repository" component={Repository} />
      </Switch>
    </BrowserRouter>
  );
}
