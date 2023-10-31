import PropTypes from 'prop-types';
import css from './Button.module.css';
export default function Button({ handlePageUpdate }) {
  function handlerClick() {
    handlePageUpdate();
  }
  return (
    <button className={css.Button} onClick={handlerClick}>
      Load more
    </button>
  );
}
Button.propTypes = {
  handlePageUpdate: PropTypes.func.isRequired,
};