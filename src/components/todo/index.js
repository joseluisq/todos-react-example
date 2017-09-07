import React, { Component } from 'react'
import format from 'date-fns/format'
import deLocale from 'date-fns/locale/de'
import './style.css'

class Todo extends Component {
  constructor () {
    super()
    this.state = { isCreateCategory: false }
  }

  componentWillMount () {
    this.setState({ isCreateCategory: false })
  }

  getStatus (status) {
    return status === '1' ? 'done' : 'open'
  }

  getDatetime (time) {
    return format(new Date(parseInt(time, 10) * 1000), 'DD.MM.YYYY HH:mm:ss', { locale: deLocale })
  }

  done (event) {
    event.preventDefault()
    this.props.onToggleTodo(this.props.todo)
  }

  remove (event) {
    event.preventDefault()
    this.props.onRemoveTodo(this.props.todo)
  }

  category (event) {
    event.preventDefault()
    this.setState({ isCreateCategory: true })
  }

  onSubmitCategory (event) {
    event.preventDefault()

    const value = this.refs.inputCategory.value

    if (value) {
      this.props.onAddCategory(this.props.todo.id, value)
    }

    this.refs.inputCategory.value = ''
    this.setState({ isCreateCategory: false })
  }

  render () {
    const todo = this.props.todo

    return (
      <li className='todo'>
        <span className={this.getStatus(todo.status === '1' ? '0' : '1')}>
          {todo.subject}
        </span>&nbsp;
        <span className='control'>[
          <a href='' onClick={this.done.bind(this)}>
            {this.getStatus(todo.status)}
          </a>/
          <a href='' onClick={this.remove.bind(this)}>remove</a>/
          <a href='' onClick={this.category.bind(this)}>add category</a>]
        </span>
        <div className='categories'><b>Categories:</b>{' '}
          {todo.categories.map((category, i) =>
            <span key={i}>{category.name}, </span>
          )}

          {!todo.categories.length && <i>none</i>}

          {this.state.isCreateCategory &&
            <form className='form-category' onSubmit={this.onSubmitCategory.bind(this)}>
              <label>New category: </label>
              <input type='text' ref='inputCategory' placeholder='name' /> &nbsp;
              <button type='submit'>+</button>
            </form>
          }
        </div>
        <div className='datetime'>Created at: {this.getDatetime(this.props.todo.created_at)}</div>
      </li>
    )
  }
}

export default Todo
