import React from 'react';

import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import GlobalStyle from './styles/global'

import { AuthProvider } from './hooks/AuthContext';

// Coloca em torno dos componentes que queremos
// que tenham acesso ao Contexto de autenticação
// AuthContext.Provider

const App: React.FC = () => (
    <>
        <AuthProvider>
            <SignIn />      
        </AuthProvider>
        <GlobalStyle/>
    </>
);

export default App;
