const mysql = require('mysql2')

const connection = mysql.createConnection({
	host: process.env.MYSQL_HOST,
	database: process.env.MYSQL_DATABASE,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
})

connection.connect()

export default (req, res) => {
	try {
		// Define the data
		const dataObjects = req.body
		let keys = ["id", "name", "stockCount"]
		let data = dataObjects.map(object => keys.map(key => object[key]))

		// Generate placeholders
		const placeholders = data.map(() => '(?, ?, ?)').join(', ')
		
		// Create the query
		const query = `
			INSERT INTO inventory (
				product_id,
				product_name,
				nfm_stock
			) VALUES ${placeholders} 
			ON DUPLICATE KEY UPDATE 
			product_id = VALUES(product_id), 
			product_name = VALUES(product_name), 
			nfm_stock = VALUES(nfm_stock)
		`
		// Flatten the data array and execute the query
		connection.query(query, [].concat(...data), (err, result) => {
			if (err) throw err
			return res.status(200).send(result)
		})
	} catch (e) {
		console.log(e)
		return res.status(200).send(e)
	}
}