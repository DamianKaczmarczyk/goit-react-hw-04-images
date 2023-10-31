import PropTypes from 'prop-types';
import css from './Modal.module.css';
export default function Modal({ closeModal, image, alt }) {
  function handleClick(e) {
    if (e.target.id === 'overlay') closeModal();
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  }
  window.addEventListener('keydown', handleKeyDown);

  return (
    <div id="overlay" className={css.Overlay} onClick={handleClick}>
      <div className={css.Modal}>
        <img src={image} alt={alt} />
      </div>
    </div>
  );
}
Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};