import React, { Component } from 'react'
import api from '../../api'
import Todo from '../todo'
import Form from '../form'
import './style.css'

class Todos extends Component {
  constructor () {
    super()
    this.state = { todos: [] }
  }

  loadData () {
    api.get('/todo').then(({ data: todos }) => this.setState({ todos }))
  }

  componentWillMount () {
    this.loadData()
  }

  onToggleTodo (todo) {
    todo.status = todo.status === '1' ? '0' : '1'
    api.put(`/todo/${todo.id}`, todo).then(() => this.loadData())
  }

  addTodo (subject) {
    api
      .post(`/todo`, {
        subject,
        status: '1'
      })
      .then(() => this.loadData())
  }

  onRemoveTodo (todo) {
    api.delete(`/todo/${todo.id}`).then(() => this.loadData())
  }

  onAddCategory (id, category) {
    api.post(`/todo/${id}/category`, {
      name: category
    }).then(() => this.loadData())
  }

  render () {
    const { todos } = this.state

    return (
      <div className='todos'>
        <Form submit={this.addTodo.bind(this)} />
        <ol>
          {todos.map((todo) =>
            <Todo key={todo.id} todo={todo}
              onToggleTodo={this.onToggleTodo.bind(this)}
              onRemoveTodo={this.onRemoveTodo.bind(this)}
              onAddCategory={this.onAddCategory.bind(this)} />)}
        </ol>
      </div>
    )
  }
}

export default Todos
