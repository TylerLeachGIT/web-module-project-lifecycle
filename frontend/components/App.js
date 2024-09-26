import React, { Component } from 'react'
import TodoList from './TodoList'
import Form from './Form'


const URL = 'http://localhost:9000/api/todos'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      filterCompleted: false,
      isLoading: true,
      error: null
    };
  }
  
  componentDidMount() {
    fetch(URL)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
      })
      .then((responseData) => {
        console.log('Fetched data:', responseData);
        if (responseData && Array.isArray(responseData.data)) {
          this.setState({
          todos: responseData.data,
          message: responseData.message,
          isLoading: false
        });
        } else {
          throw new Error('Received data is not in the expected format');
        }
      })
      .catch((err) => {
        console.error("Error fetching todos:", err);
        this.setState({ error: err.message, isLoading: false });
      });
    }

  addTodo = (todoText) => {
    const newTodo = { text: todoText, completed: false, id: Date.now().toString() };
    this.setState(prevState => ({
      todos: [...prevState.todos, newTodo]
    }));

    fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo) //when sending data to a webserver it has to be a string. This converts a Javascrpit object into a string with 
      // JSON.stringify()
    }).catch(err => console.error("Error adding todo:", err));
  }

  toggleCompleted = (id) => {
    this.setState(prevState => {
      const todos = prevState.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      return { todos };
    });

    const todoToUpdate = this.state.todos.find(todo => todo.id === id);
    fetch(`${URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...todoToUpdate, completed: !todoToUpdate.completed })
    }).catch(err => console.error("Error updating todo:", err));
  }

  clearCompleted = () => {
    const completedTodos = this.state.todos.filter(todo => todo.completed);
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed)
    }));
  
    completedTodos.forEach(todo => {
      fetch(`${URL}/${todo.id}`, { method: 'DELETE' })
      .catch(err => console.error("Error deleting todo:", err));
    });
  }

  toggleFilter = () => {
    this.setState(prevState => ({
      filterCompleted: !prevState.filterCompleted
    }));
  }

  render() {
    const { todos, filterCompleted, isLoading, error, message } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>
    }

    const displayedTodos = filterCompleted ? todos.filter(todo => !todo.completed) : todos;

    return (
      <div>
        <h1>Todo List</h1>
        {message && <p>{message}</p>}
        <Form addTodo={this.addTodo} clearCompleted={this.clearCompleted} />
        <TodoList todos={displayedTodos} toggleCompleted={this.toggleCompleted} />
        <button onClick={this.toggleFilter}>
          {filterCompleted ? 'Show All' : 'Show Incomplete'}
        </button>
      </div>
    );
  }
}
export default App;

//testing updated ssh key so my commits come from the correct github account.