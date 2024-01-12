const express = require('express');
const db = require('./db');
const chrome = require('chrome');
const bodyParser = require('body-parser');
const pool = require('./db')
// let data = {
//   "event":"onStop/onStart",
//   "values":{
//       "productTitle": "title",
//       "price":"price",
//       "link": "url"
      
//   }
// }

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text({
    type: 'text/plain'
  }));

// app.get('/', async (req, res) => {
//   try {
//     const result = await db.query('SELECT * FROM registration');
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Internal Server Error');
//   }
// });
let productTitle;
let price; 
let link;
app.post('/createProduct', db.createProduct);
app.get('/getProducts', db.getProducts)
app.get('/displayProducts', (req,res) =>{
  res.render("table_view")
})
app.post('/sentMessage', async(req,res, next)=>{
  let obj = JSON.parse(req.body)
  //  console.log(obj)
   console.log(obj.prefs)

  productTitle = obj.prefs.productTitle
  price = obj.prefs.price
  link = obj.prefs.link
 
  const toSend = obj.prefs
  console.log(toSend)
  // fetch("http://localhost:3000/createProduct", {
  //               mode :'no-cors',
  //               method:'post', 
  //               headers: {
  //                   'Accept':'application/json',
  //                   'Content-Type': 'application/json'
  //              },
  //               body: JSON.stringify({
  //                    obj
  //               })
  //           })
  //           .then(response => response.text())
  //           .then(body => {
  //           console.log('Data sent successfully:' + body);
  //           })
  //           .catch(error => {
  //           console.error('Error sending data:', error);
  // });
  
    
  res.status(200).send('all good')

    
    
  
})

app.listen(3000, () => {
    
  console.log('Server is running on port 3000');
  
});