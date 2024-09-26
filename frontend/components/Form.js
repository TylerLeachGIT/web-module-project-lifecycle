import React, { Component } from 'react'

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
  }

  handleChange = (event) => {
    this.setState({ input: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { input } = this.state;
    if (input.trim()) {
      this.props.addTodo(input);
      this.setState({ input: '' });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
        type="text"
        value={this.state.input}
        onChange={this.handleChange}
        placeholder='Add a todo'
        />
        <button type="submit">Add Todo</button>
        <button type="button" onClick={this.props.clearCompleted}>Clear Completed</button>
      </form>
    );
  }
}
export default Form;