import s from "./TodoChangeModal.module.css";
import { Button, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import { BsXCircle } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";

export default function TodoChangeModal({
  open,
  setOpen,
  someTodo,
  onSubmitChange,
}) {
  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      title: someTodo.title,
    },
  });

  useEffect(() => {
    if (someTodo) {
      formik.setFieldValue("title", someTodo.title);
    }
  }, [someTodo]);
  //   if (someTodo?.title) formik.setFieldValue("title", someTodo.title);

  return (
    <>
      <Modal show={open} onHide={handleClose}>
        <div className={s.header_modal_field}>
          <h2 className={s.modalTitle}>Change text of Note</h2>
          <button className={s.btn_circle_close} onClick={handleClose}>
            <BsXCircle className={s.bsXCircle} />
          </button>
        </div>
        <Modal.Body>
          <form className={s.form_field} onSubmit={formik.handleSubmit}>
            <textarea
              className={s.form_text_input}
              id="title"
              name="title"
              type="text"
              onChange={formik.handleChange}
              placeholder="Your text"
              value={formik.values.title}
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
              onSubmitChange(someTodo.id, formik.values.title);
              handleClose();
              formik.setFieldValue("title", "");
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
