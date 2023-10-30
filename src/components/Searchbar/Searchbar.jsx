import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
export default function Searchbar({ onSubmit }) {
  function handleSubmit(e) {
    e.preventDefault();
    const searchTerm = e.target.searchTerm.value;

    onSubmit(searchTerm);
  }
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css['SearchForm-button']}>
          <span className={css['SearchForm-button-label']}>Search</span>
        </button>

        <input
          name="searchTerm"
          className={css['SearchForm-input']}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};