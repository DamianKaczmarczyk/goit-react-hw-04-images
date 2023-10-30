import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
export default function ImageGallery({ arrayImages }) {
  return (
    <ul className={css.ImageGallery} >
      {arrayImages.map(image => (
        <ImageGalleryItem key={image.id} image={image} />
      ))}
    </ul>
  );
}
ImageGallery.propTypes = {
  arrayImages: PropTypes.array.isRequired,
};