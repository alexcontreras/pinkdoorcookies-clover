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
    const { email, password } = req.body
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?'
    const values = [email, password]

    pool.query(query, values, (err, result) => {
      if (err) throw err
      if (result.length === 0) {
        return res.status(401).send({ message: 'Incorrect email or password' })
      }
      res.send({ message: 'Successful login' })
    })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
