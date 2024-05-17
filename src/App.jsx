import { createContext, useEffect, useReducer } from "react"
import "./styles.css"
import { TodoItem } from "./TodoItem"
import { NewTodoForm } from "./NewTodoForm"

const LOCAL_STORAGE_KEY = "todos"
const ACTIONS = {
  ADD: "ADD",
  UPDATE: "UPDATE",
  TOGGLE: "TOGGLE",
  DELETE: "DELETE",
}

function reducer(todos, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD:
      return [...todos, { name: payload.name, completed: false, id: crypto.randomUUID() }]
    case ACTIONS.TOGGLE:
      return todos.map((todo) => {
        if (todo.id === payload.id) return { ...todo, completed: payload.completed }
        return todo
      })
    case ACTIONS.DELETE:
      return todos.filter((todo) => todo.id !== payload.id)
    default:
      return null
  }
}

export const TodoContext = createContext()

function App() {
  const [todos, dispatch] = useReducer(reducer, [], (initialValue) => {
    const value = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (value == null) return initialValue
    return JSON.parse(value)
  })

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function addNewTodo(name) {
    dispatch({ type: ACTIONS.ADD, payload: { name } })
  }

  function toggleTodo(todoId, completed) {
    dispatch({ type: ACTIONS.TOGGLE, payload: { id: todoId, completed } })
  }

  function deleteTodo(todoId) {
    dispatch({ type: ACTIONS.DELETE, payload: { id: todoId } })
  }

  return (
    <TodoContext.Provider
      value={{
        todos,
        addNewTodo,
        toggleTodo,
        deleteTodo,
      }}
    >
      <ul id="list">
        {todos.map((todo) => {
          return <TodoItem key={todo.id} {...todo} />
        })}
      </ul>

      <NewTodoForm />
    </TodoContext.Provider>
  )
}

export default App
