import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { BsXCircle } from "react-icons/bs";
import { useFormik } from "formik";
import s from "./FormModal.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function FormModal({ show, setShow }) {
  const handleClose = () => setShow(false);

  const formik = useFormik({
    initialValues: {
      noteName: "",
      text: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <div className={s.header_modal_field}>
          <h2 className={s.modalTitle}>Enter your Note</h2>
          <button className={s.btn_circle_close} onClick={handleClose}>
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
              onChange={formik.handleChange}
              value={formik.values.noteName}
            />

            <label htmlFor="text">Text of Note</label>
            <textarea
              className={s.form_text_input}
              id="text"
              name="text"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.text}
            />
          </form>
        </Modal.Body>
        <Modal.Footer className={s.modal_footer}>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              formik.handleSubmit();
              handleClose();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
