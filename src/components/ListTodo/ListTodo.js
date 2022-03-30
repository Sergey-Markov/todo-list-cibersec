import s from "./ListTodo.module.css";
import { Button } from "react-bootstrap";

export default function ListTodo({ setShow }) {
  const handleShow = () => setShow(true);

  return (
    <div className={s.field}>
      <div className={s.field_title}>
        <p className={s.title_filter}>Your List</p>
        <form onSubmit="">
          <label>
            <p className={s.filter_title}>Filter:</p>
            <input
              className={s.filter_input}
              type="text"
              value=""
              onChange=""
              placeholder="enter query"
            />
          </label>
          <Button className={s.filter_btn} variant="primary" onClick="">
            Enter
          </Button>
        </form>

        <Button
          className={s.newNote_btn}
          variant="primary"
          onClick={handleShow}
        >
          Add your Note
        </Button>
      </div>
    </div>
  );
}
