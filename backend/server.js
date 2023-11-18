const path = require('path')
const express = require('express')
const colors = require('colors')
const { errorHandler } = require('./middleware/errorMiddleWare')
const connectDB = require('./config/db')
const dotenv = require('dotenv').config()

const Port = process.env.Port || 5000

// connect to database
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : false}))



// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

// Serve Frontend
if(process.env.NODE_ENV === 'production') {
    //set build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => res.sendFile(__dirname, '../', 'frontend', '/build','/index.html'))
} else {
    app.get('/', (req, res) => {
        res.json({ message: 'Welcome to Support Desk API' })
    })
}

app.use(errorHandler)

app.listen(Port,'0.0.0.0', ()=> console.log(`Server started at port number ${Port}`))