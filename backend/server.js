import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import hostLogin from './routes/hostLogin.js'
import gamerLogin from './routes/gamerLogin.js'
import gameRoute from './routes/gameRoute.js'
import booking from './routes/slotbook.js'
import verify from './routes/verification.js'

const app = express()

app.use(express.json())
app.use(cors({
  origin: process.env.FRONTEND_URL
}));
app.use(express.urlencoded({ extended: true })); 

app.use('/api/host-auth' , hostLogin)
app.use('/api/gamer-auth' , gamerLogin)
app.use('/api/games' , gameRoute)
app.use('/api/booking' , booking)
app.use('/api/verify' , verify)

mongoose.connect(process.env.MONGO_URL).then(() => console.log('database connected')).catch((err) => console.log(err))

app.listen(process.env.PORT , () => {
    console.log('server connected')
})