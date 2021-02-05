import React from 'react';
import GlobalStyle from './styles/global'

import Routes from './routes'

import { BrowserRouter as Router } from 'react-router-dom'

const App: React.FC = () => (
  <>
    <Router>
      <Routes />
      <GlobalStyle />
    </Router>
  </>
)

export default App;
