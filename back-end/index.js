import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import MessageRoutes from "./routes/MessageRoutes.js"
import GroupRoutes from "./routes/GroupRoutes.js"

const app = express()
 
app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use(cors())

app.use("/", MessageRoutes)
app.use("/groups", GroupRoutes)

const CONNECTION_URL = 'mongodb+srv://p4palu1:rest2003@cluster1.edyhn.mongodb.net/?retryWrites=true&w=majority'
const PORT = 5000

mongoose.connect( CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(app.listen(PORT, () => console.log('listening on port 5000...')))
    .catch(err => console.log(err.message))