import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
export default function ImageGallery({ arrayImages, openModal }) {
  return (
    <ul className={css.ImageGallery}>
      {arrayImages.map(image => (
        <ImageGalleryItem key={image.id} image={image} openModal={openModal} />
      ))}
    </ul>
  );
}
ImageGallery.propTypes = {
  arrayImages: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};