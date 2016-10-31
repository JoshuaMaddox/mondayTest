import React, { Component } from 'react'
import SomeStore from '../stores/SomeStore'

export default class Layout extends Component {
  constructor() {
    super();
    this.state = {
      someKey: SomeStore.getAllStuff()
    }
    this._onChange = this._onChange.bind(this)
  }

   componentWillMount() {
    SomeStore.startListening(this._onChange)
  }

  componentWillUnmount() {
    SomeStore.stopListening(this._onChange)
  }

  _onChange() {
    this.setState({
      someKey: SomeStore.getAllStuff()
    })
  }

  render() {

    return (
      <h1>Sweet Mongoose / React Template Ready to Go</h1>
    )
  }
}
