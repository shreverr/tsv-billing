import express from 'express'
import type { Application } from 'express'
import dotenv from 'dotenv'
import { connectDatabase, sequelize } from './config/database'

dotenv.config()

const app: Application = express()
const port = process.env.PORT ?? 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

void connectDatabase()

// require('./models/attendance/Attendance')
// require('./models/attendance/Holiday')
// require('./models/attendance/Leave')
// require('./models/attendance/OvertimeRequest')
// require('./models/user/User')
// require('./models/user/RefreshToken')
// require('./models/user/Password')
// require('./models/company/Role')
// require('./models/company/Department')

void sequelize.sync()
  .then(() => {
    console.log('Database & tables created!')
  })
  .catch((error) => {
    console.log(`Error in syncing to DB: ${error}`)
  })

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
