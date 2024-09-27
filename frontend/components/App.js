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
      error: null,
      message: ''
    };
  }
  
  componentDidMount() {
    this.fetchTodos();
  }

  fetchTodos = () => {
    fetch(URL)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
      })
      .then((responseData) => {
        console.log('Fetched data:', responseData);
          this.setState({
          todos: responseData.data,
          message: responseData.message,
          isLoading: false
        });
      })
      .catch((err) => {
        console.error("Error fetching todos:", err);
        this.setState({ error: err.message, isLoading: false });
      });
    }

  addTodo = (todoText) => {
    const newTodo = { text: todoText, completed: false };
    fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo) //when sending data to a webserver it has to be a string. This converts a Javascrpit object into a string with 
      // JSON.stringify()
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add todo');
      }
      return response.json();
    })
    .then(addedTodo => {
      this.setState(prevState => ({
        todos: [...prevState.todos, addedTodo]
      }));
    })
    .catch(err => console.error("Error adding todo:", err));
  }

  toggleCompleted = (id) => {
    fetch(`${URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update todo');
      }
      return response.json();
    })
    .then(updatedTodo => {
      this.setState(prevState => ({
        todos: prevState.todos.map(todo => 
          todo.id === updatedTodo.id ? updatedTodo : todo
        )
      }));
    })
    .catch(err => {
      console.error("Error updating todo:", err);
    });
  }

  clearCompleted = () => {
    const incompleteTodos = this.state.todos.filter(todo => !todo.completed);
    this.setState({ todos: incompleteTodos });
  }

  toggleFilter = () => {
    this.setState(prevState => ({
      filterCompleted: !prevState.filterCompleted
    }));
  }

  render() {
    const { todos, filterCompleted, isLoading, error, message } = this.state;

    console.log('Rendering App, todos:', todos);//debug

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>
    }

    const displayedTodos = filterCompleted ? todos.filter(todo => !todo.completed) : todos;


    return (
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <h1>Todo List</h1>
        {message && <p>{message}</p>}
        <p>Total todos: {todos.length}</p>
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