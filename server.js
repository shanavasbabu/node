const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')

// require('dotenv/config')

const api = require('./routes/api')

const app = express()

app.use(express.json())
app.use(bodyparser.json())
app.use(cors())

// app.listen(process.env.PORT);
app.listen(5000);

app.get('/',(req,res)=>{
    res.send('Helo from server')
})

app.use('/api', api)

// console.log(process.env.SECRET_KEY);



