import s from "./TodoChangeModal.module.css";
import { useCallback, useEffect, useState } from "react";

import { Button, Modal } from "react-bootstrap";
import { BsXCircle } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TodoChangeModal({
  open,
  toggleModal,
  someTodo,
  onSubmitChange,
}) {
  const [value, setValue] = useState(someTodo?.title);

  useEffect(() => {
    if (someTodo) {
      setValue(someTodo?.title || "");
    }
  }, [someTodo]);

  const handleSubmit = useCallback(() => {
    onSubmitChange(someTodo?.id, value);
  }, [someTodo, value]);

  const handleChange = useCallback(
    (e) => {
      setValue(e.target.value);
    },
    [value]
  );

  return (
    <Modal show={open} onHide={toggleModal}>
      <div className={s.header_modal_field}>
        <h2 className={s.modalTitle}>Change text of Note</h2>
        <button className={s.btn_circle_close} onClick={toggleModal}>
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
        <Button variant="secondary" onClick={toggleModal}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            handleSubmit(); // declarate function with useCallback
            toggleModal();
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
