import TodoItem from "../TodoItem/TodoItem";

import s from "./RenderListTodo.module.css";

const RenderListTodo = ({
  todos,
  handleClickDeleteBtn,
  toggleModal,
  setSomeTodo,
  handleClickCompleteBtn,
  handleChangeTextTodoBtn,
}) => {
  return (
    <ol className={s.field_list}>
      {todos.map((todo) => {
        return (
          <TodoItem
            todo={todo}
            handleClickDeleteBtn={handleClickDeleteBtn}
            handleClickCompleteBtn={handleClickCompleteBtn}
            handleChangeTextTodoBtn={handleChangeTextTodoBtn}
            toggleModal={toggleModal}
            setSomeTodo={setSomeTodo}
          />
        );
      })}
    </ol>
  );
};
export default RenderListTodo;
