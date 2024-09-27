import React, { Component } from 'react'

class Todo extends Component {
  handleToggle = () => {
    const { todo, toggleCompleted } = this.props;
    toggleCompleted(todo.id);
  }

  render () {
    const { todo } = this.props;
    console.log('Rendering Todo:', todo);
    return (
      <li
      onClick={this.handleToggle}
      style={{
        textDecoration: todo.completed ? 'line-through' : 'none',
        cursor: 'pointer',
        padding: '10px',
        border: '1px solid #ddd',
        marginBottom: '5px',
        backgroundColor: '#f9f9f9',
        color: 'black'
        }}
      >
        {todo.name}
      </li>
    );
  }
}
export default Todo;