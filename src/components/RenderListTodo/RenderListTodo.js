import { useState, useCallback } from "react";
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
  handleChangeTextTodoBtn,
}) => {
  const activeStyleClassTodo = s.list_item_text;
  const completedStyleClassTodo = s.list_item_text_completed;

  return (
    <ol className={s.field_list}>
      {todos.map((todo) => {
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
      })}
    </ol>
  );
};
export default RenderListTodo;
