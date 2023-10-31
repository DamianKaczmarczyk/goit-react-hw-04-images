import axios from 'axios';
import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

const STATE = {
  arrayImages: [],
  title: '',
  page: 1,
  isLoading: false,
  error: '',
  showModal: false,
  imageModal: '',
  alt: '',
};

class App extends Component {
  state = {
    ...STATE,
  };
  async componentDidMount() {
    await this.getByImage();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.title !== this.state.title ||
      prevState.page !== this.state.page
    ) {
      await this.getByImage();
    }
  }
  async getByImage(per_page = 12) {
    try {
      this.setState({ isLoading: true });
      const moviesByImage = await axios.get('https://pixabay.com/api/', {
        params: {
          key: '39342195-5a46dd0258ec48c84a8f82d33',
          q: `${this.state.title}`,
          page: `${this.state.page}`,
          per_page: `${per_page}`,
        },
      });
      this.setState(prev => ({
        arrayImages: [...prev.arrayImages, ...moviesByImage.data.hits],
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  onSubmit = event => {
    return this.setState({
      title: event,
      arrayImages: [],
      page: 1,
    });
  };

  handlePageUpdate = () => {
    this.setState(state => {
      return {
        page: state.page + 1,
      };
    });
  };

  openModal = (largeImage, alt) => {
    this.setState({ showModal: true, image: largeImage, alt: alt });
  };
  closeModal = () => {
    this.setState({ showModal: false, image: '', alt: '' });
  };

  render() {
    const { arrayImages, isLoading, error, showModal, image, alt } = this.state;
    return (
      <div
        style={{
          height: '100vh',
          // display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Searchbar onSubmit={this.onSubmit} />
        {error && <p>Something went wrong: {error.message}</p>}
        {isLoading && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Loader isLoading={isLoading} />
          </div>
        )}
        {arrayImages.length > 0 && (
          <ImageGallery arrayImages={arrayImages} openModal={this.openModal} />
        )}
        {arrayImages.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button handlePageUpdate={this.handlePageUpdate} />
          </div>
        )}
        {showModal && (
          <Modal closeModal={this.closeModal} image={image} alt={alt} />
        )}
      </div>
    );
  }
}

export default App;