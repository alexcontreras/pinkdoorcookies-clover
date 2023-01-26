import React, { useEffect, useState } from 'react'
import axios from 'axios'
import InventoryTable from './InventoryTable'

const Inventory = ({ isSyncing }) => {
	const [items, setItems] = useState([])
	useEffect(() => {
		axios.get('/api/inventory').then((data) => {
			console.log(data.data)
			setItems(data.data)
		})
	}, [])
	
	return (
		<div className={isSyncing ? 'opacity-50' : ''}>
			{items.length > 0 && (
				<InventoryTable items={items} />
			)}
		</div>
	)
}

export default Inventory