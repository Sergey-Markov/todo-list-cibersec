import { useState, useCallback } from "react";
import { useTodos } from "../../utils/hooks/useTodos";
import { useFormik } from "formik";

import TodoChangeModal from "../todoChangeModal/TodoChangeModal";
import FormModal from "../FormModal/FormModal";
import { TodoEdit } from "../TodoEdit";
import RenderListTodo from "../RenderListTodo/RenderListTodo";

import s from "./ListTodo.module.css";
import Menu from "../Menu/Menu";

const ListTodo = () => {
  const { todos, allTodos, setTodos } = useTodos();
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [someTodo, setSomeTodo] = useState(null);

  const onSubmit = useCallback(
    ({ filter, isCompleted, isActive }) => {
      const filteredTodosForWordCompleted = !filter && isCompleted && !isActive;
      const filteredTodosForWord = !filter && isActive && isCompleted;
      const filteredTodosForWordActive = !filter && isActive;

      if (filteredTodosForWordCompleted) {
        const filteredTodos = allTodos.filter(
          ({ completed }) => completed === isCompleted
        );
        setTodos(filteredTodos);
        return;
      }
      if (filteredTodosForWord) {
        setTodos(allTodos);
        return;
      }
      if (filteredTodosForWordActive) {
        const result = allTodos.filter(
          ({ completed }) => completed === !isActive
        );
        setTodos(result);
        return;
      }

      if (!filter) {
        setTodos(allTodos);
        return;
      }

      const normalizeFilter = filter.toLowerCase().trim();

      const filteredTodos = allTodos.filter(({ title, completed }) => {
        const normalizeTitle = title.toLowerCase().trim();
        const allCheckboxMarked =
          (normalizeTitle.includes(normalizeFilter) &&
            completed === isCompleted) ||
          (normalizeTitle.includes(normalizeFilter) && completed === !isActive);
        return allCheckboxMarked;
      });
      setTodos(filteredTodos);
    },
    [allTodos]
  );
  const handleShow = () => setShow((prev) => !prev);
  const toggleModal = () => {
    setOpen((prev) => !prev);
  };
  const formik = useFormik({
    initialValues: {
      filter: "",
      isActive: false,
      isCompleted: false,
    },
    onSubmit,
  });

  const handleClickResetBtn = () => {
    setTodos(allTodos);
    formik.setValues({
      isActive: false,
      isCompleted: false,
      filter: "",
    });
  };
  const handleClickDeleteBtn = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos]
  );
  const handleClickChangeBtn = useCallback(
    (id, text) => {
      if (!text) return;
      const newArray = todos.map((todo) =>
        todo.id === id ? { ...todo, title: text } : todo
      );
      setTodos(newArray);
    },
    [todos]
  );
  const handleClickCompleteBtn = useCallback(
    (id) => {
      const newArray = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(newArray);
    },
    [todos]
  );
  const handleChangeTextTodoBtn = useCallback((todo) => {
    toggleModal();
    setSomeTodo(todo);
  }, []);
  return (
    <div className={s.field}>
      <TodoEdit
        formik={formik}
        handleClickResetBtn={handleClickResetBtn}
        handleShow={handleShow}
      />
      <RenderListTodo
        todos={todos}
        handleClickDeleteBtn={handleClickDeleteBtn}
        toggleModal={toggleModal}
        setSomeTodo={setSomeTodo}
        handleClickCompleteBtn={handleClickCompleteBtn}
        handleChangeTextTodoBtn={handleChangeTextTodoBtn}
      />
      <TodoChangeModal
        open={open}
        toggleModal={toggleModal}
        someTodo={someTodo}
        onSubmitChange={handleClickChangeBtn}
      />
      <Menu />
      <FormModal show={show} setShow={handleShow} setAllTodos={setTodos} />
    </div>
  );
};
export default ListTodo;
