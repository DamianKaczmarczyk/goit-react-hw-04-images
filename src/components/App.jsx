import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

export default function App() {
  const [arrayImages, setArrayImages] = useState([]);
  const [title, setTitle] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [imageModal, setImageModal] = useState('');
  const [alt, setAlt] = useState('');

  useEffect(() => {
    getByImage();
  }, []);

  useEffect(() => {
    getByImage();
  }, [title, page]);

  async function getByImage() {
    try {
      setIsLoading(true);
      const moviesByImage = await axios.get('https://pixabay.com/api/', {
        params: {
          key: '39342195-5a46dd0258ec48c84a8f82d33',
          q: title,
          page: page,
          per_page: 12,
        },
      });

      setArrayImages([...arrayImages, ...moviesByImage.data.hits]);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  const onSubmit = event => {
    setTitle(event);
    setArrayImages([]);
    setPage(1);
  };

  const handlePageUpdate = () => {
    setPage(page + 1);
  };

  const openModal = (largeImage, alt) => {
    setShowModal(true);
    setImageModal(largeImage);
    setAlt(alt);
  };
  const closeModal = () => {
    setShowModal(false);
    setImageModal('');
    setAlt('');
  };

    return (
      <div
        style={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Searchbar onSubmit={onSubmit} />
        {error && <p>Something went wrong: {error.message}</p>}
        {isLoading && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Loader isLoading={isLoading} />
          </div>
        )}
        {arrayImages.length > 0 && (
          <ImageGallery arrayImages={arrayImages} openModal={openModal} />
        )}
        {arrayImages.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button handlePageUpdate={handlePageUpdate} />
          </div>
        )}
        {showModal && (
          <Modal closeModal={closeModal} image={imageModal} alt={alt} />
        )}
      </div>
    );
  }
