import React, { useEffect, useState } from 'react'
import axios from 'axios'
import InventoryTable from './InventoryTable'

const AUTH_TOKEN = '8a84d42c-35eb-8686-e601-8f643c879931'

axios.defaults.baseURL = 'https://api.clover.com'
axios.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`
const instance = axios.create()

const Inventory = () => {
	const [items, setItems] = useState([])
	useEffect(() => {
		instance.get('/v3/merchants/4FKKZT8Q4YAF1/categories/R4XEGFAM3BDVG/items?filter=available=true&limit=1000').then((res) => {
			console.log(res.data)
			setItems(res.data.elements)
		})
	}, [])
	return (
		<div>
			{items.length > 0 && (
				<InventoryTable items={items} />
			)}
		</div>
	)
}

export default Inventory