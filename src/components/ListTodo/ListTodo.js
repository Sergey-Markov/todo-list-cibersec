import { Button } from "react-bootstrap";
import { useFormik } from "formik";
import { RiDeleteBin5Line, RiChatQuoteLine } from "react-icons/ri";
import { MdOutlineDoneAll } from "react-icons/md";
import s from "./ListTodo.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import TodoChangeModal from "../todoChangeModal/TodoChangeModal";

export default function ListTodo({ setShow }) {
  const [open, setOpen] = useState(false);

  const [allTodos, setAllTodos] = useState([]);
  const [todos, setTodos] = useState([]);
  const [someTodo, setSomeTodo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      setAllTodos(result.data);
      setTodos(result.data);
    };
    fetchData();
  }, []);

  const handleShow = () => setShow(true);
  const handleOpen = () => setOpen(true);
  const formik = useFormik({
    initialValues: {
      filter: "",
      isActive: false,
      isCompleted: false,
    },
    onSubmit: ({ filter, isCompleted, isActive }) => {
      if (!filter && isCompleted && !isActive) {
        const filteredTodos = allTodos.filter(
          ({ completed }) => completed === isCompleted
        );
        setTodos(filteredTodos);
        return;
      }
      if (!filter && isActive && isCompleted) {
        setTodos(allTodos);
        return;
      }
      if (!filter && isActive) {
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
        return (
          (title.toLowerCase().trim().includes(normalizeFilter) &&
            completed === isCompleted) ||
          (title.toLowerCase().trim().includes(normalizeFilter) &&
            completed === !isActive)
        );
      });
      setTodos(filteredTodos);
    },
  });

  const handleClickResetBtn = () => {
    setTodos(allTodos);
    formik.setValues({
      isActive: false,
      isCompleted: false,
      filter: "",
    });
  };
  const handleClickDeleteBtn = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    console.log(`id:${id}`);
  };
  const handleClickChangeBtn = (id, text) => {
    console.log(text);
    if (!text) return;
    const newArray = todos.map((todo) =>
      todo.id === id ? { ...todo, title: text } : todo
    );
    setTodos(newArray);
  };
  const handleClickCompleteBtn = (id) => {
    const newArray = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newArray);
  };

  return (
    <div className={s.field}>
      <div className={s.field_title}>
        <p className={s.title_field}>Your List</p>
        <form className={s.form_field} onSubmit={formik.handleSubmit}>
          <label htmlFor="filter" className={s.filter_title}>
            Filter:
          </label>
          <input
            className={s.filter_input}
            id="filter"
            name="filter"
            type="filter"
            onChange={formik.handleChange}
            value={formik.values.filter}
          />
          <label className={s.checkBoxActive}>
            Active
            <input
              id="checkbox-active"
              type="checkbox"
              name="isActive"
              onChange={formik.handleChange}
              checked={formik.values.isActive}
              value={formik.values.isActive}
            />
          </label>
          <label className={s.checkBoxArchive}>
            Completed
            <input
              id="checkbox"
              type="checkbox"
              name="isCompleted"
              onChange={formik.handleChange}
              checked={formik.values.isCompleted}
            />
          </label>
          <Button
            type="button"
            className={s.resetBtn}
            variant="primary"
            onClick={handleClickResetBtn}
          >
            Reset
          </Button>
          <Button type="submit" className={s.filter_btn} variant="primary">
            Enter
          </Button>
        </form>

        <Button
          className={s.newNote_btn}
          variant="primary"
          onClick={handleShow}
        >
          Add your Note
        </Button>
      </div>
      <ol className={s.field_list}>
        {todos.map((todo) => {
          return (
            <li key={todo.id} className={s.list_item_field}>
              <p
                className={
                  todo.completed ? s.list_item_text : s.list_item_text_completed
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
                    handleOpen();
                    setSomeTodo(todo);
                    // handleClickChangeBtn(todo.id, text);
                  }}
                >
                  <RiChatQuoteLine />
                </Button>
                <Button
                  type="button"
                  className={s.ctrlBtn}
                  variant="primary"
                  onClick={() => {
                    handleClickCompleteBtn(todo.id);
                  }}
                >
                  <MdOutlineDoneAll />
                </Button>
              </div>
            </li>
          );
        })}
      </ol>
      <TodoChangeModal
        open={open}
        setOpen={setOpen}
        someTodo={someTodo}
        onSubmitChange={handleClickChangeBtn}
      />
    </div>
  );
}
