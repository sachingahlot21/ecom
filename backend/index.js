const express = require('express')
const cors = require('cors')

const app = express()

const {connectToMongoDB} =  require('./connection')

const PORT = 8000

const proRoute = require('./routes/index')

app.use(cors())

connectToMongoDB('mongodb://127.0.0.1:27017/assign3_ecom')
.then(()=> console.log("mongodb connected"))
.catch((err) => console.log("error..." , err))

app.use(express.urlencoded({extended : false}))
app.use(express.json())


app.use('/product' , proRoute)

app.listen(PORT , () => console.log("APP STARTED AT PORT : " , PORT))