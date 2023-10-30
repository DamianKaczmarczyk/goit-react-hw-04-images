import axios from 'axios';
import React, { Component } from 'react';


const STATE = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  filter: '',
};

class App extends Component {
  state = {
    ...STATE,
  };

  async getByImage(title = 'dog', page = 1, per_page = 12) {
    try {
      const moviesByImage = await axios.get('https://pixabay.com/api', {
        params: {
          key: '39342195-5a46dd0258ec48c84a8f82d33',
          q: `${title}`,
          page: `${page}`,
          per_page: `${per_page}`,
        },
      });
      const array = moviesByImage.data.results;
      console.log(array);
    } catch (error) {
      console.log(error);
    }
  }


  render() {
    this.getByImage();
    return (
      <div
        style={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      ></div>
    );
  }
}

export default App;


