import { Button } from "react-bootstrap";
import { RiDeleteBin5Line, RiChatQuoteLine } from "react-icons/ri";
import { MdOutlineDoneAll } from "react-icons/md";

import s from "./RenderListTodo.module.css";

const RenderListTodo = ({
  todos,
  handleClickDeleteBtn,
  toggleModal,
  setSomeTodo,
  handleClickCompleteBtn,
}) => {
  return (
    <ol className={s.field_list}>
      {todos.map((todo) => {
        return (
          <li key={todo.id} className={s.list_item_field}>
            <p
              className={
                !todo.completed // to constant
                  ? s.list_item_text
                  : s.list_item_text_completed
              }
            >
              {todo.title}
            </p>
            <div>
              <Button
                type="button"
                className={s.ctrlBtn}
                variant="primary"
                onClick={() => {
                  handleClickDeleteBtn(todo.id);
                }}
              >
                <RiDeleteBin5Line />
              </Button>
              <Button
                type="button"
                className={s.ctrlBtn}
                variant="primary"
                onClick={() => {
                  toggleModal();
                  setSomeTodo(todo); // to one func and useCallback
                  // handleClickChangeBtn(todo.id, text);
                }}
              >
                <RiChatQuoteLine />
              </Button>
              <Button
                type="button"
                className={s.ctrlBtn}
                variant="primary"
                onClick={() => handleClickCompleteBtn(todo.id)}
              >
                <MdOutlineDoneAll />
              </Button>
            </div>
          </li>
        );
      })}
    </ol>
  );
};
export default RenderListTodo;
