import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'
import { SERVER_URL } from '../../Config/api'

class DataTable extends Component {

  deleteItem = (id) => {
    let confirmDelete = window.confirm('Delete car forever?')
    if (confirmDelete) {
      fetch(`${SERVER_URL}/inventories/${id}`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(response => response.json())
        .then(item => {
          this.props.deleteItemFromState(id)
        })
        .catch(err => console.log(err))
    }
  }

  render() {

    const items = this.props.items.map((item, index) => {
      return (
        <tr key={index}>
          <th scope="row">{item.id}</th>
          <td>{item.name}</td>
          <td>{item.model}</td>
          <td>{parseFloat(item.price).toFixed(2)}</td>
          <td>{item.sku}</td>
          <td>
            <div style={{ width: "110px" }}>
              <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState} />
              {' '}
              <Button color="danger" onClick={() => this.deleteItem(item.id)}>Del</Button>
            </div>
          </td>
        </tr>
      )
    })

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Car Name</th>
            <th>Car Model</th>
            <th>Price</th>
            <th>SKU</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    )
  }
}

export default DataTable