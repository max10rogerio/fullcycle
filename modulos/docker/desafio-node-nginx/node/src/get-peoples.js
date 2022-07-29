const { promisify } = require('node:util')
const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'db',
  port: '3306',
  user: 'root',
  password: 'root',
  database: 'nodedb'
})

connection.connect()

const queryAsync = () => new Promise((resolve) => {
  connection.query('SELECT * FROM people', (_err, results) => {
    resolve(results)
  })
})

exports.getPeoples = async () => {
  const peoples = await queryAsync()

  return peoples
}

