import express from 'express'
import type { Application } from 'express'
import dotenv from 'dotenv'
import { connectDatabase, sequelize } from './config/database'
import puppeteer from 'puppeteer'
import path from 'path'

dotenv.config()

const app: Application = express()
const port = process.env.PORT ?? 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

void connectDatabase()

void sequelize.sync()
  .then(() => {
    console.log('Database & tables created!')
  })
  .catch((error) => {
    console.log(`Error in syncing to DB: ${error}`)
  })

app.post('/api/v1/generate-invoice', async (req, res) => {
  try {
    console.log(path.dirname(__dirname) + '/invoice-template/index.html')
    
    // const browser = await puppeteer.launch({
    //   headless: false
    // });
    // const page = await browser.newPage();
    // await page.goto('file://C:/Data/Projects/tsv-invoice-gen/server/invoice-template/index.html')
    // await page.pdf({ path: '/pdf/example.pdf', format: 'A4', printBackground: true });
    // await browser.close();
    return res.json({ message: "Heres your PDF!." });
  } catch (error) {
    console.log(error)
  }
  return res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
