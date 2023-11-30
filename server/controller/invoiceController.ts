import puppeteer from 'puppeteer'
import path from 'path'
import ejs from 'ejs'
import { Request, RequestHandler, Response } from 'express'
import { nanoid } from 'nanoid'

export const generateInvoice: RequestHandler = async (req: Request, res: Response) => {
  try {
    let totalAmount = 0
    req.body.tableData.forEach((row: any) => {
      row.netAmount = Number(row.amount) * Number(row.quantity)
      totalAmount += row.netAmount
    })

    const invoiceNumber = nanoid(10)

    const data = {
      ...req.body,
      totalAmount: totalAmount,
      invoiceNumber: invoiceNumber,
    }
    
    const invoiceTemplatePath = (path.dirname(__dirname) + '/views/templates/pdf-template.ejs').split(path.sep).join(path.posix.sep)
    const browser = await puppeteer.launch({
      headless: 'new'
    });
    const page = await browser.newPage();
    await page.setContent(await ejs.renderFile(invoiceTemplatePath, { ...data }))
    await page.pdf({ path: 'pdf/example.pdf', format: 'A4', printBackground: true });
    await browser.close();

    return res.status(200).send('Success')
  } catch (error) {
    console.log(error)
    return res.status(500).send('Something went wrong')
  }
}
