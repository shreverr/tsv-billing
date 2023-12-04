import { NextResponse } from "next/server";
import { nanoid } from 'nanoid'
import generateInvoice from "@/features/invoice-generator";

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

    return new NextResponse(JSON.stringify({ message: 'success' }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error: any) {
    let error_response = {
      status: "error",
      message: 'something went wrong',
      error: error,
    };

    console.log(error);

    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
