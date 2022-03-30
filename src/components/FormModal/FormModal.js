import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
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
        <Modal.Header className={s.modal_title} closeButton>
          <Modal.Title className={s.modal_title}>Modal heading</Modal.Title>
        </Modal.Header>
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
            <input
              id="text"
              name="text"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.text}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
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
