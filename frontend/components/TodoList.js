import React from 'react'
import Todo from './Todo'

class TodoList extends React.Component {
  render () {
    const { todos, toggleCompleted } = this.props;

    console.log('TodoList rendering, todos:', todos); //debug

    if (!Array.isArray(todos)) {
      console.error('todos is not an array:', todos);
      return <p>There was an error loading the todos. Please try again later.</p>
    }

    if (todos.length === 0) {
      return <p>No todos yet. Add a todo to get started!</p>;
    }

    return (
      <div>
        <p>Number of todos: {todos.length}</p>
      <ul className='todo-list' style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <Todo
          key={todo.id}
          todo={todo}
          toggleCompleted={toggleCompleted}
          />
        ))}
      </ul>
      </div>
    );
  }
}
export default TodoList;