const Pool = require('pg').Pool
const pool = new Pool({
  user: 'arjunsudhalkar',
  host: 'localhost',
  database: 'extension_manager',
  password: '',
  port: 5432,
})
let display;
const getProducts = (request, response) => {
    pool.query('SELECT * FROM product ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(results.rows)
      
    })

  }

  const createProduct = (request, response) => {
    // const { temp_title, temp_price, temp_link } = request.body
    console.log(request.body)
    obj = JSON.parse(request.body)
    console.log(obj.prefs)
    var productTitle = obj.prefs.productTitle
    var price = obj.prefs.price
    var link = obj.prefs.link
    
    pool.query('INSERT INTO product (productTitle, price, link) VALUES ($1, $2, $3) RETURNING *', [productTitle, price, link], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
  }

  const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
  
    pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [name, email, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }

  const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }

//   module.exports = {
//     getUsers,
//     getUserById,
//     createUser,
//     updateUser,
//     deleteUser,
//   }

  exports.getProducts = getProducts;
  exports.createProduct = createProduct;