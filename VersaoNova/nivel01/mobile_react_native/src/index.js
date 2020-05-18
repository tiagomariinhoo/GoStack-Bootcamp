import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, StyleSheet, StatusBar, FlatList, TouchableOpacity } from 'react-native';

import api from './services/api';

/**
 * Não possuem valor semântico (significado), não tem isso de header e footer
 * Não possuem estilização própria
 * Todos componentes possuem por padrão "display: flex"
 * 
 * View: div, footer, header, main, aside, section
 * Text: p, span, strong, h1, h2, h3
 * 
 * Aqui utilizamos o Axios também para consumir os dados da API
 */

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data)
    })
  }, []);

  async function handleAddProject() {
    const response = await api.post('projects', {
      title: `Novo  Projeto ${Date.now()}`,
      owner: 'Tiago Marinho'
    })
    const project = response.data;

    setProjects([...projects, project]);
  }


  return (
    <>
      <StatusBar barStyle="light-content"/>
      <SafeAreaView style={styles.container}>
        <FlatList
        data={projects}
        keyExtractor={project => project.id}
        renderItem={({ item: project }) => (
          <Text style={styles.title}>{project.title}</Text>
          )}
        />

        <TouchableOpacity 
        activeOpacity={0.6} 
        style={styles.button}
        onPress={handleAddProject}>
          <Text style={styles.buttonText}>Adicionar Projeto</Text>
        </TouchableOpacity>

      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  // Mesmas propriedades que tem no css
  // Para pegar o mesmo do css, basta tirar o hifen e substituir
  // a primeira letra por maisculo
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
    // justifyContent: 'center',
    // alignItems:  'center',
  }, 

  title: {
    color: '#FFF',
    fontSize: 30,
  },

  button: {
    backgroundColor: '#FFF',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  }
});