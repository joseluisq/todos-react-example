import React, { Component } from 'react'
import './style.css'

class Form extends Component {
  submit (event) {
    event.preventDefault()

    const value = this.refs.inputTodo.value

    if (value) {
      this.props.submit(value)
    }

    this.refs.inputTodo.value = ''
  }

  render () {
    return (
      <form className='todo-new' onSubmit={this.submit.bind(this)}>
        <label>New Todo: </label>
        <input type='text' ref='inputTodo' /> &nbsp;
        <button type='submit'>+</button>
      </form>
    )
  }
}

export default Form
