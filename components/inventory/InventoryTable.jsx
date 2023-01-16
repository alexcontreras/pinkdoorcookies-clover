import React from 'react'
import InventoryTableItem from './InventoryTableItem'

const InventoryTable = ({items}) => {
	return (
		<table className="table table-striped table-responsive">
			<thead>
				<tr>
					<th scope="col">Flavor</th>
					<th scope="col">Suite 311 stock</th>
					<th scope="col">NFM stock</th>
					<th scope="col">Total</th>
					<th scope="col">Transfer from 311 to NFM</th>
					<th scope="col">History</th>
				</tr>
			</thead>
			<tbody>
				{items.map((item) => {
					return (
						<InventoryTableItem key={item.id} item={item} />
					)
				})}
			</tbody>
		</table>
	)
}

export default InventoryTable