import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DigimonCard = ({ digimon, setSelectedDigimon }) => {
  return (
    <View style={styles.digimonCard}>
      <Image source={{ uri: digimon.img }} style={styles.image} />
      <Text style={styles.title}>Name: {digimon.name}</Text>
      <Text>Level: {digimon.level}</Text>
      <TouchableOpacity style={styles.detailsButton}>
        <Text style={styles.buttonText}>Adquirir</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.detailsButton}>
        <Text style={styles.buttonText}>Devolver</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  digimonCard: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 10,
  },
  detailsButton: {
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: '#3498db',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default DigimonCard;
