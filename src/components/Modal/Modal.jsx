import css from "./Modal.module.css"
export default function Modal() {


  return (
    <div className={css.Overlay}>
      <div className={css.Modal}>
        <img src="" alt="" />
      </div>
    </div>
  );
}

galleryList.addEventListener('click', e => {
  e.preventDefault();
  const urlImg = e.target.dataset.source;
  if (!urlImg) {
    return;
  }
  const instance = basicLightbox.create(`
    <img src= ${urlImg}>
`);

  instance.show();
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      instance.close();
    }
  });
});

(() => {
  const refs = {
    openModalBtn: document.querySelector('[follow-open]'),
    closeModalBtn: document.querySelector('[follow-close]'),
    modal: document.querySelector('[follow-container]'),
  };

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
  }
})();