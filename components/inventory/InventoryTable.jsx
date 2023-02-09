import { shape } from 'prop-types'
import React from 'react'
import InventoryTableItem from './InventoryTableItem'

function InventoryTable({ items }) {
  return (
    <table className="table table-striped table-responsive">
      <thead>
        <tr>
          <th scope="col">Flavor</th>
          <th scope="col">Suite 311 stock</th>
          <th scope="col">NFM stock</th>
          <th scope="col">Total</th>
          <th scope="col">Transfer from 311 to NFM</th>
          <th scope="col">NFM after transfer</th>
          <th scope="col">History</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => {
          return <InventoryTableItem key={item.id} item={item} />
        })}
      </tbody>
    </table>
  )
}

InventoryTable.propTypes = {
  items: shape([{}]).isRequired,
}

export default InventoryTable
