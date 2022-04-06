import { Button, Modal } from "react-bootstrap";
import { BsXCircle } from "react-icons/bs";
import { useFormik } from "formik";
import { useCallback } from "react";

import shortid from "shortid";

import s from "./FormModal.module.css";

export default function FormModal({ show, setShow, setAllTodos }) {
  const onSubmit = useCallback((values) => {
    const newTodo = {
      userId: shortid.generate(),
      id: shortid.generate(),
      noteName: values.noteName,
      title: values.text,
      completed: false,
    };

    setAllTodos((prevState) => {
      return [newTodo, ...prevState];
    });
    setShow();
    formik.setFieldValue("text", ""); // to setValues(...)
    formik.setFieldValue("noteName", "");
  }, []);

  const formik = useFormik({
    initialValues: {
      noteName: "",
      text: "",
    },
    onSubmit,
  });

  return (
    <Modal show={show} onHide={setShow}>
      <div className={s.header_modal_field}>
        <h2 className={s.modalTitle}>Enter your Note</h2>
        <button className={s.btn_circle_close} onClick={setShow}>
          <BsXCircle className={s.bsXCircle} />
        </button>
      </div>
      <Modal.Body>
        <form className={s.form_field} onSubmit={formik.handleSubmit}>
          <label htmlFor="noteName">Name of Note</label>
          <input
            id="noteName"
            name="noteName"
            type="text"
            placeholder="Enter name of Note"
            onChange={formik.handleChange}
            value={formik.values.noteName}
          />

          <label htmlFor="text">Text of Note</label>
          <textarea
            className={s.form_text_input}
            id="text"
            name="text"
            type="text"
            placeholder="Enter your text"
            onChange={formik.handleChange}
            value={formik.values.text}
          />
        </form>
      </Modal.Body>
      <Modal.Footer className={s.modal_footer}>
        <Button variant="secondary" onClick={setShow}>
          Close
        </Button>
        <Button variant="primary" onClick={formik.handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
