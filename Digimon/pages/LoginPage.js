import React, { useState } from 'react';
import { View, Text, TextInput, Button, ImageBackground, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const backgroundImage = require('../imagens/LoginPage.jpg');
  const navigation = useNavigation();

  const handleLogin = () => {
    if (login.trim() === '' || password.trim() === '') {
      Alert.alert('O preenchimento dos campos é obrigatório');
    } else {
      navigation.navigate('Home');
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Usuário"
          value={login}
          onChangeText={(text) => setLogin(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '90%',
    height: 300,
    borderRadius:10
  },
  button: {
    backgroundColor: '#ffe6ca',
    borderRadius:10,
    width: '80%',
    padding: 10,
    alignItems: 'center',
    color: '#0c242a',
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    color: 'black',
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 40,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: 'transparent',
    fontSize: 18,
    color: 'black',
  },
});

export default LoginPage;
