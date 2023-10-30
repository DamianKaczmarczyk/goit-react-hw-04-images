import axios from 'axios';
import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';


const STATE = {
  arrayImages: [],
  title: '',
  page: 1,
  isLoading: false,
  error: '',
};

class App extends Component {
  state = {
    ...STATE,
  };
  async componentDidMount() {
    await this.getByImage();

    console.log('componentDidMount');
  }

  async componentDidUpdate() {
    await this.getByImage();
    console.log('componentDidUpdate');
  }

  shouldComponentUpdate(nextProps, nextState) {
    const oldState = this.state;
    if (
      nextState.title === oldState.title &&
      nextState.page === oldState.page
    ) {
      return false;
    }
    return true;
  }
  async getByImage(per_page = 12) {
    try {
      const moviesByImage = await axios.get('https://pixabay.com/api/', {
        params: {
          key: '39342195-5a46dd0258ec48c84a8f82d33',
          q: `${this.state.title}`,
          page: `${this.state.page}`,
          per_page: `${per_page}`,
        },
      });
      this.setState(prev => ({
        arrayImages: moviesByImage.data.hits,
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }


  onSubmit = event => {
    console.log(event);

    return this.setState({
      title: event,
    });
  };

  handlePageUpdate = () => {
    this.setState(state => {
      return {
        page: state.page + 1,
      };
    });
  };

  render() {
    console.log(this.state);

    console.log('render');
    const { arrayImages, isLoading, error } = this.state;

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
        <Searchbar onSubmit={this.onSubmit} />
        {error && <p>Something went wrong: {error.message}</p>}
        {isLoading && <Loader isLoading={isLoading} />}
        {arrayImages.length > 0 && <ImageGallery arrayImages={arrayImages} />}

        <Button handlePageUpdate={this.handlePageUpdate} />
      </div>
    );
  }
}

export default App;


