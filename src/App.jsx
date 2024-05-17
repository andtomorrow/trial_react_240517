import { useEffect, useReducer, useRef, useState } from "react"
import "./styles.css"
import { TodoItem } from "./TodoItem"

const LOCAL_STORAGE_KEY = "todos"
const ACTIONS = {
  ADD: "ADD",
  UPDATE: "UPDATE",
  TOGGLE: "TOGGLE",
  DELETE: "DELETE",
}

function App() {
  const [todos, dispatch] = useReducer(reducer, [], (initialValue) => {
    const value = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (value == null) return initialValue

    return JSON.parse(value)
  })

  const nameRef = useRef()

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function reducer(todos, { type, payload }) {
    switch (type) {
      case ACTIONS.ADD:
        return [...todos, { name: payload.name, completed: false, id: crypto.randomUUID() }]
      default:
        return null
    }
  }

  function addNewTodo(name) {
    if (name === "") return

    dispatch({ type: ACTIONS.ADD, payload: { name } })

    name = ""
  }

  // function toggleTodo(todoId, completed) {
  //   setTodos((currentTodos) => {
  //     return currentTodos.map((todo) => {
  //       if (todo.id === todoId) return { ...todo, completed }

  //       return todo
  //     })
  //   })
  // }

  // function deleteTodo(todoId) {
  //   setTodos((currentTodos) => {
  //     return currentTodos.filter((todo) => todo.id !== todoId)
  //   })
  // }

  return (
    <>
      <ul id="list">
        {todos.map((todo) => {
          return <TodoItem key={todo.id} {...todo} toggleTodo={() => null} deleteTodo={() => null} />
        })}
      </ul>

      <div id="new-todo-form">
        <label htmlFor="todo-input">New Todo</label>
        <input type="text" id="todo-input" ref={nameRef} />
        <button onClick={() => addNewTodo(nameRef.current.value)}>Add Todo</button>
      </div>
    </>
  )
}

export default App
