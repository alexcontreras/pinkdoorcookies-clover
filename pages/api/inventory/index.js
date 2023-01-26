import executeQuery from "../../../lib/db"

export default async (req, res) => {
	if (req.method === 'POST') {
		try {
			const result = await executeQuery({
				query: "INSERT INTO inventory(product_id, product_name, stock_quantity, stock_quantity_after_transfer, nfm_stock, transfer_amount, nfm_after_transfer, total, history) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE stock_quantity=?, stock_quantity_after_transfer=?, nfm_stock=?, transfer_amount=?, nfm_after_transfer=?, total=?, history=?",
				values: [
					req.body.product_id,
					req.body.product_name,
					req.body.stock_quantity,
					req.body.stock_quantity_after_transfer,
					req.body.nfm_stock,
					req.body.transfer_amount,
					req.body.nfm_after_transfer,
					req.body.total,
					req.body.history,
					req.body.stock_quantity,
					req.body.stock_quantity_after_transfer,
					req.body.nfm_stock,
					req.body.transfer_amount,
					req.body.nfm_after_transfer,
					req.body.total,
					req.body.history
				]
			})
			return res.status(200).json(result)
		} catch (err) {
			console.log(err)
		}
	} else if (req.method === 'PUT') {
		try {
			const result = await executeQuery({
				query: "UPDATE inventory SET product_name=?, stock_quantity=?, stock_quantity_after_transfer=?, nfm_stock=?, transfer_amount=?, nfm_after_transfer=?, total=?, history=? WHERE product_id=?",
				values: [
					req.body.product_name,
					req.body.stock_quantity,
					req.body.stock_quantity_after_transfer,
					req.body.nfm_stock,
					req.body.transfer_amount,
					req.body.nfm_after_transfer,
					req.body.total,
					req.body.history,
					req.body.product_id
				]
			})
			return res.status(200).json(result)
		} catch (err) {
			console.log(err)
		}
	} else if (req.method === 'GET') {
		if (!req.body.product_id) {
			try {
				const result = await executeQuery({
					query: 'SELECT * FROM inventory'
				})
				return res.status(200).json(result)
			} catch (err) {
				console.log(err)
			}
		} else {
			try {
				const result = await executeQuery({
					query: 'SELECT * FROM inventory WHERE product_id = ?',
					values: [req.body.product_id]
				})
				return res.status(200).json(result)
			} catch (err) {
				console.log(err)
			}
		}
	}
}