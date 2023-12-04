import { NextResponse } from "next/server";
import { nanoid } from 'nanoid'
import generateInvoice from "@/features/invoice-generator";
import fs from "fs";
import path from "path";
// import pdfFile from "@/views/templates/pdf-template.ejs";

export async function POST(req: Request) {
  try {
    const requestData = await req.json();
    let totalAmount = 0
    requestData.tableData.forEach((row: any) => {
      row.netAmount = Number(row.amount) * Number(row.quantity)
      totalAmount += row.netAmount
    })

    const invoiceNumber = nanoid(10)

    const data = {
      ...requestData,
      totalAmount: totalAmount,
      invoiceNumber: invoiceNumber,
    }

    await generateInvoice(data)
    const file = fs.readFileSync((path.dirname(process.cwd()) + '/client/pdf/example.pdf').split(path.sep).join(path.posix.sep));

    const headers = new Headers();
    headers.append('Content-Disposition', 'attachment; filename="invoice.pdf"');
    headers.append('Content-Type', 'application/text');

    return new NextResponse(file, {
      status: 200,
      headers: headers,
    });
  } catch (error: any) {
    let error_response = {
      status: "error",
      message: 'something went wrong',
      error: error,
    };

    console.log(`error at reading generated file`, error);

    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
