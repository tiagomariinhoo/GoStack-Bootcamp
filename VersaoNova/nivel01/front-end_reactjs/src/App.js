import React, { useState, useEffect } from 'react';

import Header from './components/Header';
import './App.css';
// import backgroundImage from './assets/background.jpg';

import api from './services/api';

/**
 * Componente
 * Propriedade
 *  Passa de um componente pai para um comp filho
 * Estado e Imutabilidade
 * 
 * O axios é o responsável por comunicar o front com o back-end
 */

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    });
  }, []);

  // UseState retorna um array com duas posições:
  // 1. Variavel com o seu valor inicial
  // 2. Função para atualizarmos esse valor

  /**
   * Sempre que está lidando com uma ação do usuário, começa 
   * o nome da função com handle
   */
  async function handleAddProject() {
    // projects.push('Novo projeto');
    // Adiciona no array um novo projeto
    // ...projects é para copiar tudo que tinha antes
    // setProjects([...projects, 'Novo Projeto']);
    const response = await api.post('projects', {
      title: `Teste teste ${Date.now()}`,
      owner: "Tiago Marinho"
    })

    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
    <>
      <Header title="Homepage"/>

      {/* <img width={300} src={backgroundImage}></img> */}

      <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
      </ul>

      <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
    </>
  );
}

export default App;