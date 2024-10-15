import React, { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';

function App() {
  const [isCompleteScreen, setisCompleteScreen] = useState(false);

  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const [CompletedTodos, setCompletedTodos] = useState([]);

  const handlerAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setAllTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    let savedCompletedTodo = JSON.parse(localStorage.getItem("completedTodos"));

    if (savedTodo) {
      setAllTodos(savedTodo);
    }
    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  }, []);

  const handleDelete = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1); // Remove 1 item at the index
    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
    setAllTodos(reducedTodo);
  };

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = `${dd}-${mm}-${yyyy} at ${h}:${m}:${s}`;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };
    let updatedCompletedArr = [...CompletedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDelete(index); // Remove from allTodos when completed
    localStorage.setItem("completedTodos", JSON.stringify(updatedCompletedArr));
  };

  const handleDeleteCompleted = (index) => {
    let reducedCompletedTodos = [...CompletedTodos];
    reducedCompletedTodos.splice(index, 1); // Remove 1 item at the index
    localStorage.setItem("completedTodos", JSON.stringify(reducedCompletedTodos));
    setCompletedTodos(reducedCompletedTodos);
  };

  return (
    <div className="App">
      <h1>My Todos</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label htmlFor="">Title</label>
            <input
              type="text"
              placeholder="What's the task title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
          <div className="todo-input-item">
            <label htmlFor="">Description</label>
            <input
              type="text"
              placeholder="What's the task description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>
          <div className="todo-input-item">
            <button type="button" className="primaryBtn" onClick={handlerAddTodo}>
              Add
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompleteScreen === false && 'active'}`}
            onClick={() => setisCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen === true && 'active'}`}
            onClick={() => setisCompleteScreen(true)}
          >
            Completed
          </button>
        </div>

        <div className="todo-list">
          {!isCompleteScreen &&
            allTodos.map((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

                <div>
                  <AiOutlineDelete className="icon" onClick={() => handleDelete(index)} />
                  <BsCheckLg className="check-icon" onClick={() => handleComplete(index)} />
                </div>
              </div>
            ))}
          {isCompleteScreen &&
            CompletedTodos.map((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p>
                    <small>Completed on: {item.completedOn}</small>
                  </p>
                </div>

                <div>
                  <AiOutlineDelete className="icon" onClick={() => handleDeleteCompleted(index)} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
