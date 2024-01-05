const express = require('express');
const db = require('./db');
const chrome = require('chrome');
const bodyParser = require('body-parser');

const app = express();
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

app.post('/sentMessage', async(req,res, next)=>{

   console.log(req.body)
    res.send("all good")
})

app.listen(3000, () => {
    
  console.log('Server is running on port 3000');
  
});