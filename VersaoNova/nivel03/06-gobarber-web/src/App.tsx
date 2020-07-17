import React from 'react';

import Routes from './routes';
import GlobalStyle from './styles/global'

import { BrowserRouter as Router } from 'react-router-dom';

import { AppProvider } from './hooks';

// Coloca em torno dos componentes que queremos
// que tenham acesso ao Contexto de autenticação
// AuthContext.Provider

const App: React.FC = () => (
    <Router>
        <AppProvider>
                <Routes/>
        </AppProvider>
        <GlobalStyle/>
    </Router>
);

export default App;
