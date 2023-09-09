import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DigimonCard from '../Components/DigimonCard';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const DadosDigimon = () => {
  const [digimons, setDigimons] = useState([]);
  const [selectedDigimon, setSelectedDigimon] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(0);
  const [currentDigimons, setCurrentDigimons] = useState([]);

  useEffect(() => {
    async function fetchDigimons() {
      try {
        const response = await axios.get('https://digimon-api.vercel.app/api/digimon');
        const data = response.data.slice();
        setDigimons(data);
        setPageNumber(Math.ceil(data.length / 8)); // Calcular o número total de páginas
      } catch (error) {
        console.log(error);
      }
    }

    fetchDigimons();
  }, []);

  useEffect(() => {
    if (digimons.length > 0) {
      setCurrentDigimons(digimons.slice((currentPage - 1) * 8, currentPage * 8));
    }
  }, [currentPage, digimons]);

  const PagesComponent = () => {
    const [visiblePages, setVisiblePages] = useState(5);
    const [startPage, setStartPage] = useState(1);

    useEffect(() => {
      setStartPage(Math.floor((currentPage - 1) / visiblePages) * visiblePages + 1);
    }, [currentPage, visiblePages]);

    const handlePageClick = (page) => {
      setCurrentPage(page);
    };

    const handleFirstPage = () => {
      setCurrentPage(1);
    };

    const handleLastPage = () => {
      setCurrentPage(pageNumber);
    };

    const handlePrevPage = () => {
      setCurrentPage(Math.max(1, currentPage - 1));
    };

    const handleNextPage = () => {
      setCurrentPage(Math.min(pageNumber, currentPage + 1));
    };

    const divs = [];

    for (let i = startPage; i < startPage + visiblePages; i++) {
      if (i > pageNumber) break;

      divs.push(
        <TouchableOpacity
          onPress={() => handlePageClick(i)}
          key={i}
          style={{
            padding: 5,
            backgroundColor: i === currentPage ? 'yellow' : 'white',
            margin: 5,
            cursor: 'pointer',
          }}
        >
          <Text>{i}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        {currentPage > 1 && (
          <TouchableOpacity
            onPress={handleFirstPage}
            style={{ padding: 5, backgroundColor: 'yellow', margin: 5, cursor: 'pointer' }}
          >
            <Text>{'<<'}</Text>
          </TouchableOpacity>
        )}
        {currentPage > 1 && (
          <TouchableOpacity
            onPress={handlePrevPage}
            style={{ padding: 5, backgroundColor: 'yellow', margin: 5, cursor: 'pointer' }}
          >
            <Text>{'<'}</Text>
          </TouchableOpacity>
        )}
        {divs}
        {currentPage < pageNumber && (
          <TouchableOpacity
            onPress={handleNextPage}
            style={{ padding: 5, backgroundColor: 'yellow', margin: 5, cursor: 'pointer' }}
          >
            <Text>{'>'}</Text>
          </TouchableOpacity>
        )}
        {currentPage < pageNumber && (
          <TouchableOpacity
            onPress={handleLastPage}
            style={{ padding: 5, backgroundColor: 'yellow', margin: 5, cursor: 'pointer' }}
          >
            <Text>{'>>'}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View>
      <Text style={styles.containerHeader}>Deck Digimons: {currentPage}</Text>
      <View style={styles.digimonGrid}>
        {currentDigimons &&
          currentDigimons.map((digimon) => (
            <TouchableOpacity
              style={styles.digimonItem}
              key={digimon.name}
              onPress={() => setSelectedDigimon(digimon)}
            >
              {/* Substitua a tag <img> pelo componente <Image> */}
              <Image
                source={{ uri: digimon.img }} // Certifique-se de que a propriedade 'source' esteja configurada corretamente
                style={{ width: 100, height: 100 }} // Ajuste o estilo de acordo com suas necessidades
              />
              <Text>{digimon.name}</Text>
            </TouchableOpacity>
          ))}
      </View>
      {selectedDigimon && <DigimonCard digimon={selectedDigimon} setSelectedDigimon={setSelectedDigimon} />}
      <PagesComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  digimonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  digimonItem: {
    alignItems: 'center',
    padding: 10,
    margin: 10,
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
  },
});

export default DadosDigimon;
