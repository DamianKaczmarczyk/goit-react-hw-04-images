import css from "./Button.module.css"
export default function Button({ handlePageUpdate }) {
    function handlerClick() {
       handlePageUpdate() 
    } 
    return (
      <button className={css.Button} onClick={handlerClick}>
        Next page
      </button>
    );
}