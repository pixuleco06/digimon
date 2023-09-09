import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DigimonCard from '../Components/DetalhesDigimon';

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
        <div
          onClick={() => handlePageClick(i)}
          key={i}
          style={{
            padding: '5px',
            backgroundColor: i === currentPage ? 'yellow' : 'white',
            margin: '5px',
            cursor: 'pointer',
          }}
        >
          {i}
        </div>
      );
    }

    return (
      <div style={{ fontSize: '10px', display: 'flex' }}>
        {currentPage > 1 && (
          <div onClick={handleFirstPage} style={{ padding: '5px', backgroundColor: 'yellow', margin: '5px' }}>
            {'<<'}
          </div>
        )}
        {currentPage > 1 && (
          <div onClick={handlePrevPage} style={{ padding: '5px', backgroundColor: 'yellow', margin: '5px' }}>
            {'<'}
          </div>
        )}
        {divs}
        {currentPage < pageNumber && (
          <div onClick={handleNextPage} style={{ padding: '5px', backgroundColor: 'yellow', margin: '5px' }}>
            {'>'}
          </div>
        )}
        {currentPage < pageNumber && (
          <div onClick={handleLastPage} style={{ padding: '5px', backgroundColor: 'yellow', margin: '5px' }}>
            {'>>'}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <header className="containerHeader">Deck Digimons: {currentPage}</header>
      <div className="digimonGrid">
        {currentDigimons &&
          currentDigimons.map((digimon) => (
            <button
              className="digimonItem"
              key={digimon.name}
              onClick={() => setSelectedDigimon(digimon)}
            >
              <img
                src={digimon.img}
                alt={digimon.name}
                onLoad={(e) => e.target.classList.add('loaded')}
              />
              <p>{digimon.name}</p>
            </button>
          ))}
      </div>
      {selectedDigimon && <DigimonCard digimon={selectedDigimon} setSelectedDigimon={setSelectedDigimon} />}
      <PagesComponent />
    </div>
  );
};

export default DadosDigimon;
