// import "./App.css";
// import { useState } from "react";
// import FormModal from "./components/FormModal/FormModal";
import { Homepage } from "./components/Homepage";
import { ListTodo } from "./components/ListTodo";

// 1.сделать HomePage
// 2.
// 3.сделать роутер дом
// 4.страница с логотипом фильтрацией и список туду
// 5.filter checkbox: 1)complete and no filter
//                    2)checkbox in todo complete and no

function App() {
  return (
    <div>
      {/* <Homepage setShow={setShow} /> */}
      <ListTodo />
    </div>
  );
}

export default App;
