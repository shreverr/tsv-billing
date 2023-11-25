import puppeteer from "puppeteer";

export async function POST(req: Request) {
  try {
    const browser = await puppeteer.launch({
      headless: "new"
    });

    const page = await browser.newPage();
    await page.goto('file://C:/Data/Projects/tsv-invoice-gen/src/app/invoice.html')
    await page.pdf({ path: 'example.pdf', format: 'A4' });
    await browser.close();

    return Response.json({ message: "Heres your PDF!." });
  } catch (error) {
    console.log(error)
  }
}