import React, { useState, useEffect } from 'react'
import axios from 'axios'

const InventoryTableItem = ({item}) => {
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
			storeStock: parseInt(state.storeStock) - parseInt(state.transferStock)
		})

		const data = {
			product_id: item.product_id,
			product_name: item.product_name,
			stock_quantity: parseInt(state.storeStock),
			stock_quantity_after_transfer: parseInt(state.storeStock) - parseInt(state.transferStock),
			nfm_stock: parseInt(state.transferStock, 10) + parseInt(state.nfm_stock),
			transfer_amount: parseInt(state.transferStock),
			nfm_after_transfer: parseInt(state.transferStock, 10) + parseInt(state.nfm_stock),
			total: parseInt(state.storeStock) + parseInt(item.nfm_stock),
			history: null
		}

		axios.post('/api/inventory', data)
			.then((response) => {
				const body = {
					"quantity": data.nfm_after_transfer,
				}
				const url = `https://api.clover.com/v3/merchants/4FKKZT8Q4YAF1/item_stocks/${item.product_id}`
				axios.post(`api/cors-proxy`, {
					url,
					method: 'POST',
					data: body
				})
					.then( (response) => {
						console.log(response)
					})
			}).catch((e) => { console.log(e) })
		
		setIsLoading(false)
	}

	const handleChange = (event) => {
		setState({
			...state,
			[event.target.name]: event.target.value
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
					min="0" /></td>
			<td>{parseInt(state.nfm_stock, 10)}</td>
			<td>{parseInt(state.storeStock || 0) + parseInt(state.nfm_stock || 0)}</td>
			<td>
				<input
					type="number"
					name="transferStock"
					value={state.transferStock}
					onChange={handleChange}
					className="form-control"
					min="0" />
			</td>
			<td>{parseInt(state.nfm_stock, 10) + parseInt(state.transferStock || 0, 10)}</td>
			<td>Not Available</td>
			<td>
				<button
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

export default InventoryTableItem