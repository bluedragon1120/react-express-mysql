import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { SERVER_URL } from '../../Config/api'

class AddEditForm extends React.Component {
  state = {
    id: 0,
    name: '',
    model: '',
    price: '',
    sku: '',
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitFormAdd = e => {
    e.preventDefault()
    fetch(`${SERVER_URL}/inventories`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        model: this.state.model,
        price: this.state.price,
        sku: this.state.sku
      })
    })
      .then(response => response.json())
      .then(item => {
        console.log('==', item)
        if (item) {
          this.props.addItemToState(item)
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    fetch(`${SERVER_URL}/inventories/${this.state.id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // id: this.state.id,
        name: this.state.name,
        model: this.state.model,
        price: this.state.price,
        sku: this.state.sku
      })
    })
      .then(response => response.json())
      .then(item => {
        console.log('====', item)
        if (item) {
          this.props.updateState(item)
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    if (this.props.item) {
      const { id, name, model, price, sku } = this.props.item
      this.setState({ id, name, model, price, sku })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="name">Car Name</Label>
          <Input type="text" name="name" id="name" onChange={this.onChange} value={this.state.name === null ? '' : this.state.name} />
        </FormGroup>
        <FormGroup>
          <Label for="model">Car Model</Label>
          <Input type="text" name="model" id="model" onChange={this.onChange} value={this.state.model === null ? '' : this.state.model} />
        </FormGroup>
        <FormGroup>
          <Label for="sku">SKU</Label>
          <Input type="text" name="sku" id="sku" onChange={this.onChange} value={this.state.sku === null ? '' : this.state.sku} />
        </FormGroup>
        <FormGroup>
          <Label for="price">Price</Label>
          <Input type="number" name="price" id="price" onChange={this.onChange} value={this.state.price === null ? '' : this.state.price} placeholder="$300,000" />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm