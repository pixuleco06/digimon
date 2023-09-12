import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';

const MaisDetalhes = ({ route, navigation }) => {
  const { digimon } = route.params;

  const gerarInformacoesAleatorias = () => {
    const altura = Math.floor(Math.random() * 100 + 50); 
    const idade = Math.floor(Math.random() * 20 + 1);
    const treinadores = ['Ash', 'Misty', 'Brock', 'May', 'Dawn']; 
    const treinador = treinadores[Math.floor(Math.random() * treinadores.length)]; 
    const ultimaBatalha = `2023-${Math.floor(Math.random() * 12 + 1)}-${Math.floor(Math.random() * 28 + 1)}`; 

    return {
      ...digimon,
      altura,
      idade,
      treinador,
      ultimaBatalha,
    };
  };

  const digimonComInformacoesAleatorias = gerarInformacoesAleatorias();

  return (
    <ImageBackground
      source={{ uri: digimonComInformacoesAleatorias.img }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.digimonName}>{digimonComInformacoesAleatorias.name}</Text>
          <Text style={styles.detailText}>Nível: {digimonComInformacoesAleatorias.level}</Text>
          <Text style={styles.detailText}>Altura: {digimonComInformacoesAleatorias.altura} cm</Text>
          <Text style={styles.detailText}>Idade: {digimonComInformacoesAleatorias.idade} anos</Text>
          <Text style={styles.detailText}>Treinador: {digimonComInformacoesAleatorias.treinador}</Text>
          <Text style={styles.detailText}>Última Batalha: {digimonComInformacoesAleatorias.ultimaBatalha}</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.battleButton}
            onPress={() => navigation.navigate('VideoScreen')} 
          >
            <Text style={styles.battleButtonText}>Visualizar Batalha</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  digimonName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  detailText: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  battleButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  battleButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MaisDetalhes;
