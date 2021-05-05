import React, { Fragment, useState, useEffect } from "react";
import EditTodo from "./EditTodo";

const ListTodos = ({ allTodos, setTodosChange }) => {
  console.log(allTodos);
  const [todos, setTodos] = useState([]);

  async function deleteTodo(id) {
    try {
        await fetch(`http://localhost:5000/dashboard/todos/${id}`, {
        method: "DELETE",
        headers: { authorization: localStorage.token }
      });

      setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    console.log("setTodos")
    setTodos(allTodos);
  }, [allTodos]);

  console.log(todos);

  return (
    <Fragment>
      {" "}
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>  
          {console.log("todos:"+todos.length)}
          {todos.length !== 0 && console.log("todos[0]:"+todos[0].key)}
          { 
            todos.length !== 0 &&
              todos[0].todo_id !== null &&
              todos.map(todo => (
                <tr key={todo.todo_id}>
                  <td>{todo.description}</td>
                  <td>
                    <EditTodo todo={todo} setTodosChange={setTodosChange} />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteTodo(todo.todo_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            }
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
