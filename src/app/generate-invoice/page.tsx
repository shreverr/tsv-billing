'use client'

import { DatePicker } from "@/components/generate-invoice/DatePicker";
import InputTable from "@/components/generate-invoice/InputTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Home() {
  const [tableData, setTableData] = useState([])
  const [billingDate, setBillingDate] = useState('')
  const [dueDate, setDueDate] = useState('')

  const getTableData = (tableData: any) => {
    setTableData(tableData)
  }

  const getBillingDate = (billingDate: any) => {
    setBillingDate(billingDate)
  }

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    // console.log("submit");
    console.log(billingDate);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 pt-24 container">
      <div className="w-full max-w-[1080px] border h-full flex-grow rounded-md p-4">
        <form onSubmit={onSubmit}>
          <div className="flex flex-col justify-center gap-10">
            <div className="flex gap-4 flex-wrap items-center justify-normal">
              <DatePicker content={'Billing Date'} date={getBillingDate} />
              <DatePicker content={'Due Date'} date='' />
            </div>
            <div className="flex flex-wrap items-center justify-evenly">
              <div className="flex flex-col gap-4 flex-wrap">
                <div className="font-medium">
                  Billed To
                </div>
                <Input className="sm:w-[280px] w-full" type="text" placeholder="Name" />
                <Input className="sm:w-[400px] w-full" type="text" placeholder="Address line 1" />
                <Input className="sm:w-[400px] w-full" type="text" placeholder="Address line 2" />
                <Input className="sm:w-[280px] w-full" type="text" placeholder="City" />
                <Input className="sm:w-[280px] w-full" type="text" placeholder="State" />
                <Input className="sm:w-[280px] w-full" type="text" placeholder="Pincode" />
                <Input className="sm:w-[280px] w-full" type="text" placeholder="Mobile" />
                <Input className="sm:w-[280px] w-full" type="text" placeholder="Mobile 2" />
              </div>
              <div className="flex flex-col gap-4 flex-wrap">
                <div className="font-medium">
                  From
                </div>
                <Input className="sm:w-[280px] w-full" type="text" placeholder="Name" value={`The Software Venture`} />
                <Input className="sm:w-[400px] w-full" type="text" placeholder="Address line 1" />
                <Input className="sm:w-[400px] w-full" type="text" placeholder="Address line 2" />
                <Input className="sm:w-[280px] w-full" type="text" placeholder="City" />
                <Input className="sm:w-[280px] w-full" type="text" placeholder="State" />
                <Input className="sm:w-[280px] w-full" type="text" placeholder="Pincode" />
                <Input className="sm:w-[280px] w-full" type="text" placeholder="Mobile" value={`+91 9891331105`} />
                <Input className="sm:w-[280px] w-full" type="text" placeholder="Mobile 2" value={`+91 9456311750`} />
              </div>
            </div>
            <InputTable getTableData={getTableData} />
            <Button className="w-full sm:w-[200px] self-end">Generate Invoice</Button>
          </div>
        </form>
      </div>
    </main>
  )
}