const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoute = require('./src/routes/UserRoute')

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()

// routes middlewares
app.use('/api/users', userRoute)

app.get('/', (req, res) => {
    res.send("<h3>hello from backend</h3>")
})

mongoose.connect(process.env.ATLAS_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(4000, () => {
        console.log("port learning at port 4000")
    })
}).catch((error) => {
    console.log(`failed to connect with database ${error}`)
})
