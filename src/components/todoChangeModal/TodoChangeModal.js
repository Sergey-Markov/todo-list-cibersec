import s from "./TodoChangeModal.module.css";
import { Button, Modal } from "react-bootstrap";
import { BsXCircle } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCallback, useEffect, useState } from "react";

export default function TodoChangeModal({
  open,
  setOpen,
  someTodo,
  onSubmitChange,
}) {
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (someTodo) {
      setValue(someTodo?.title ? someTodo.title : "");
    }
  }, [someTodo]);

  const handleSubmit = useCallback(() => {
    onSubmitChange(someTodo?.id, value);
  }, [someTodo?.id, value, onSubmitChange]);

  const handleChange = useCallback(
    (e) => {
      setValue(e.target.value);
    },
    [setValue]
  );

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
          <form htmlFor="title" className={s.form_field}>
            <textarea
              className={s.form_text_input}
              id="title"
              name="title"
              type="text"
              onChange={handleChange}
              placeholder="Your text"
              value={value}
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
              handleSubmit();
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
