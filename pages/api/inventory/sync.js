const mysql = require('mysql2')

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export default async (req, res) => {
  try {
    // Define the data
    const dataObjects = req.body
    const data = dataObjects.map((object) => [
      object.id,
      object.name,
      object.itemStock.stockCount,
    ])

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
    pool.query(query, [].concat(...data), (err, result) => {
      if (err) throw err
      res.status(200).json({ data: result })
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: e.message })
  }
}
