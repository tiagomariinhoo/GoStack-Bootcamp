import React, { useState } from 'react';
import GlobalStyle from './styles/global'

import Routes from './routes'

import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from './Provider/ThemeProvider';

const App: React.FC = () => {

  return (
    <>
      <Router>
        <ThemeProvider>
          <Routes />
          <GlobalStyle />
        </ThemeProvider>
      </Router>
    </>
  )
}

export default App;
