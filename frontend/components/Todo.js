import React, { Component } from 'react'

class Todo extends Component {
  handleToggle = () => {
    const { todo, toggleCompleted } = this.props;
    toggleCompleted(todo.id);
  }

  render () {
    const { todo } = this.props;
    return (
      <li
      onClick={this.handleToggle}
      style={{
        textDecoration: todo.completed ? 'line-through' : 'none',
        cursor: 'pointer'
        }}
      >
        {todo.text}
      </li>
    );
  }
}
export default Todo;