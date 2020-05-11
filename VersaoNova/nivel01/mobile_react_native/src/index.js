import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

/**
 * Não possuem valor semântico (significado), não tem isso de header e footer
 * Não possuem estilização própria
 * Todos componentes possuem por padrão "display: flex"
 * 
 * View: div, footer, header, main, aside, section
 * Text: p, span, strong, h1, h2, h3
 */

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content"/>
      <View style={styles.container}>
        <Text style={styles.title}>Hello Tiago!</Text>
      </View>
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
    justifyContent: 'center',
    alignItems:  'center',
  }, 

  title: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold', 
  }
});