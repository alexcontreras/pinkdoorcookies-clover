import React, { useState } from 'react'

const InventoryTableItem = ({item}) => {
	const [storeStock, setStoreStock] = useState(0)
	const handleStoreStock = (e) => {
		setStoreStock(e.target.value)
	}
	return (
		<tr key={item.id}>
			<td>{item.name}</td>
			<td><input type="number" name={item.id} value={storeStock} onChange={(e) => handleStoreStock(e)} className="form-control" min="0" /></td>
			<td>{item.stockCount}</td>
			<td>{parseInt(item.stockCount, 10) + parseInt(storeStock || 0, 10)}</td>
			<td><input type="number" name={item.id} className="form-control" min="0" /></td>
			<td>N/A</td>
		</tr>
	)
}

export default InventoryTableItem