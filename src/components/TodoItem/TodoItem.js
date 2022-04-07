import { Button } from "react-bootstrap";
import { RiDeleteBin5Line, RiChatQuoteLine } from "react-icons/ri";
import { MdOutlineDoneAll } from "react-icons/md";

import s from "./TodoItem.module.css";
const TodoItem = ({
  todo,
  toggleModal,
  setSomeTodo,
  handleClickCompleteBtn,
  handleChangeTextTodoBtn,
  handleClickDeleteBtn,
}) => {
  const activeStyleClassTodo = s.list_item_text;
  const completedStyleClassTodo = s.list_item_text_completed;
  return (
    <li key={todo.id} className={s.list_item_field}>
      <p
        className={
          !todo.completed ? activeStyleClassTodo : completedStyleClassTodo
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
          onClick={() => handleChangeTextTodoBtn(todo)}
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
};
export default TodoItem;
