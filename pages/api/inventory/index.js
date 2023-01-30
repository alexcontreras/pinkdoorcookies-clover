const mysql = require('mysql2')

const pool = mysql.createPool({
	host: process.env.MYSQL_HOST,
	database: process.env.MYSQL_DATABASE,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
})

export default async (req, res) => {
	if (req.method === 'POST') {
		try {
			const query = "INSERT INTO inventory(product_id, product_name, stock_quantity, stock_quantity_after_transfer, nfm_stock, transfer_amount, nfm_after_transfer, total, history) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE stock_quantity=?, stock_quantity_after_transfer=?, nfm_stock=?, transfer_amount=?, nfm_after_transfer=?, total=?, history=?"

			const values = [
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

			pool.query(query, values, (err, result) => {
				if (err) throw err
				return res.status(200).send(result)
			})
		} catch (err) {
			console.log(err)
		}
	} else if (req.method === 'PUT') {
		try {
			const query = "UPDATE inventory SET product_name=?, stock_quantity=?, stock_quantity_after_transfer=?, nfm_stock=?, transfer_amount=?, nfm_after_transfer=?, total=?, history=? WHERE product_id=?"
			const values = [
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
			
			pool.query(query, values, (err, result) => {
				if (err) return err
				return res.status(200).send(result)
			})
		} catch (err) {
			console.log(err)
		}
	} else if (req.method === 'GET') {
		if (!req.body.product_id) {
			try {
				const query = 'SELECT * FROM inventory'
				pool.query(query, (err, result) => {
					if (err) throw err
					return res.status(200).send(result)
				})
			} catch (err) {
				console.log(err)
			}
		} else {
			try {
				const query = 'SELECT * FROM inventory WHERE product_id = ?'
				const values = [req.body.product_id]
				pool.query(query, values, (err, result) => {
					if (err) throw err
					return res.status(200).send(result)
				})
			} catch (err) {
				console.log(err)
			}
		}
	}
}