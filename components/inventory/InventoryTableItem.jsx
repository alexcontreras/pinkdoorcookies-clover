import React, { useState } from 'react'
import { shape } from 'prop-types'
import axios from 'axios'

function InventoryTableItem({ item }) {
  const [state, setState] = useState({
    storeStock: item.stock_quantity_after_transfer,
    transferStock: 0,
    nfm_stock: item.nfm_stock,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = () => {
    setIsLoading(true)
    setState({
      ...state,
      storeStock:
        parseInt(state.storeStock, 10) - parseInt(state.transferStock, 10),
    })

    const data = {
      product_id: item.product_id,
      product_name: item.product_name,
      stock_quantity: parseInt(state.storeStock, 10),
      stock_quantity_after_transfer:
        parseInt(state.storeStock, 10) - parseInt(state.transferStock, 10),
      nfm_stock:
        parseInt(state.transferStock, 10) + parseInt(state.nfm_stock, 10),
      transfer_amount: parseInt(state.transferStock, 10),
      nfm_after_transfer:
        parseInt(state.transferStock, 10) + parseInt(state.nfm_stock, 10),
      total: parseInt(state.storeStock, 10) + parseInt(item.nfm_stock, 10),
      history: null,
    }

    axios
      .post('/api/inventory', data)
      .then(() => {
        const body = {
          quantity: data.nfm_after_transfer,
        }
        const url = `https://api.clover.com/v3/merchants/4FKKZT8Q4YAF1/item_stocks/${item.product_id}`
        axios
          .post(`api/cors-proxy`, {
            url,
            method: 'POST',
            data: body,
          })
          .then((res) => {
            console.log(res)
          })
      })
      .catch((e) => {
        console.log(e)
      })

    setIsLoading(false)
  }

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <tr key={item.product_id}>
      <td>{item.product_name}</td>
      <td>
        <input
          type="number"
          name="storeStock"
          value={state.storeStock || ''}
          onChange={handleChange}
          className="form-control"
          min="0"
        />
      </td>
      <td>{parseInt(state.nfm_stock, 10)}</td>
      <td>
        {parseInt(state.storeStock || 0, 10) +
          parseInt(state.nfm_stock || 0, 10)}
      </td>
      <td>
        <input
          type="number"
          name="transferStock"
          value={state.transferStock}
          onChange={handleChange}
          className="form-control"
          min="0"
        />
      </td>
      <td>
        {parseInt(state.nfm_stock, 10) + parseInt(state.transferStock || 0, 10)}
      </td>
      <td>Not Available</td>
      <td>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSave}
          disabled={isLoading}
        >
          Save
        </button>
      </td>
    </tr>
  )
}

InventoryTableItem.propTypes = {
  item: shape({}).isRequired,
}
export default InventoryTableItem
