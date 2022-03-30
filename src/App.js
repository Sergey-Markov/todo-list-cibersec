// import "./App.css";
import { useState } from "react";
import FormModal from "./components/FormModal/FormModal";
import { Homepage } from "./components/Hompage";
import { ListTodo } from "./components/ListTodo";

// 1.сделать HomePage
// 2.
// 3.сделать роутер дом
// 4.страница с логотипом фильтрацией и список туду

function App() {
  const [show, setShow] = useState(false);

  return (
    <div>
      {/* <Homepage setShow={setShow} /> */}
      <ListTodo setShow={setShow} />
      <FormModal show={show} setShow={setShow} />
    </div>
  );
}

export default App;
