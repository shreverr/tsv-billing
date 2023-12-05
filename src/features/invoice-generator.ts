import path from "path"
// import puppeteer from "puppeteer";
import ejs from 'ejs'
const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

const generateInvoice = async (data: any) => {
  try {
    console.log(process.cwd());

    const invoiceTemplatePath = (
      // process.cwd() + '/public/views/templates/pdf-template.ejs'
      process.cwd() + '/.next/views/templates/pdf-template.ejs'
    ).split(path.sep).join(path.posix.sep)
   
    const browser = await puppeteer.launch({
      args: chromium.args,
      // defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
    
    //use this browser for local development comment the top one
    // const browser = await puppeteer.launch({
    //   headless: 'new'
    // });

    const page = await browser.newPage();
    await page.setContent(await ejs.renderFile(invoiceTemplatePath, { ...data }))
    await page.pdf({ path: 'pdf/example.pdf', format: 'A4', printBackground: true });
    await browser.close();
  } catch (error) {
    console.log(`error at generating file`, error);
  }
}

export default generateInvoice
