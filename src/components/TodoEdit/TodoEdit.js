import { Button } from "react-bootstrap";

import s from "./TodoEdit.module.css";

const TodoEdit = ({ formik, handleClickResetBtn, handleShow }) => {
  return (
    <div className={s.field_title}>
      <p className={s.title_field}>Your List</p>
      <form className={s.form_field} onSubmit={formik.handleSubmit}>
        <label htmlFor="filter" className={s.filter_title}>
          Filter:
        </label>
        <input
          className={s.filter_input}
          id="filter"
          name="filter"
          type="filter"
          onChange={formik.handleChange}
          value={formik.values.filter}
        />
        <label className={s.checkBoxActive}>
          Active
          <input
            id="checkbox-active"
            type="checkbox"
            name="isActive"
            onChange={formik.handleChange}
            checked={formik.values.isActive}
            value={formik.values.isActive}
          />
        </label>
        <label className={s.checkBoxArchive}>
          Completed
          <input
            id="checkbox"
            type="checkbox"
            name="isCompleted"
            onChange={formik.handleChange}
            checked={formik.values.isCompleted}
          />
        </label>
        <Button
          type="button"
          className={s.resetBtn}
          variant="primary"
          onClick={handleClickResetBtn}
        >
          Reset
        </Button>
        <Button type="submit" className={s.filter_btn} variant="primary">
          Enter
        </Button>
      </form>

      <Button className={s.newNote_btn} variant="primary" onClick={handleShow}>
        Add your Note
      </Button>
    </div>
  );
};
export default TodoEdit;
