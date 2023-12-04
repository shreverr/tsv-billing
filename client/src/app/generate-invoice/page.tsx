'use client'

import { DatePicker } from "@/components/generate-invoice/DatePicker";
import InputTable from "@/components/generate-invoice/InputTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CalendarDate } from "calendar-date"

export default function Home() {
  const [tableData, setTableData] = useState([])
  const [billingDate, setBillingDate] = useState<Date>()
  const [dueDate, setDueDate] = useState<Date>()
  const [billedToData, setBilledToData] = useState({
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    mobile: '',
    mobile2: '',
  })

  const [fromData, setFromData] = useState({
    name: 'The Software Venture',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    mobile: '+91 9891331105',
    mobile2: '+91 9456311750',
  })

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setBilledToData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }
    ));
  };

  const handleFromInputChange = (event: any) => {
    const { name, value } = event.target;
    setFromData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }
    ));
  };

  const getTableData = (tableData: any) => {
    setTableData(tableData)
  }

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()

    if (billingDate !== undefined && dueDate !== undefined) {
      const billingDateFormatted = CalendarDate.fromDateLocal(billingDate).toFormat('dd/MM/yyyy')
      const dueDateFormatted = CalendarDate.fromDateLocal(dueDate).toFormat('dd/MM/yyyy')

      const invoiceData = {
        billingDateFormatted,
        dueDateFormatted,
        billedToData,
        fromData,
        tableData,
      }

      try {
        console.log('req sending');

        fetch('/api/v1/generate-invoice', {
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          method: 'POST',
          body: JSON.stringify(invoiceData),
        }).then((res) => {
          console.log('req sent');
        })
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 pt-24 container">
      <div className="w-full max-w-[1080px] border h-full flex-grow rounded-md p-4">
        <form onSubmit={onSubmit}>
          <div className="flex flex-col justify-center gap-10">
            <div className="flex gap-4 flex-wrap items-center justify-normal">
              <DatePicker content={'Billing Date'} date={billingDate} setDate={setBillingDate} />
              <DatePicker content={'Due Date'} date={dueDate} setDate={setDueDate} />
            </div>
            <div className="flex flex-wrap items-center justify-evenly">
              <div className="flex flex-col gap-4 flex-wrap">
                <div className="font-medium">
                  Billed To
                </div>
                <Input name='name' className="sm:w-[280px] w-full" type="text" placeholder="Name" value={billedToData.name} onChange={handleInputChange} />
                <Input name='addressLine1' className="sm:w-[400px] w-full" type="text" placeholder="Address line 1" value={billedToData.addressLine1} onChange={handleInputChange} />
                <Input name='addressLine2' className="sm:w-[400px] w-full" type="text" placeholder="Address line 2" value={billedToData.addressLine2} onChange={handleInputChange} />
                <Input name='city' className="sm:w-[280px] w-full" type="text" placeholder="City" value={billedToData.city} onChange={handleInputChange} />
                <Input name='state' className="sm:w-[280px] w-full" type="text" placeholder="State" value={billedToData.state} onChange={handleInputChange} />
                <Input name='pincode' className="sm:w-[280px] w-full" type="text" placeholder="Pincode" value={billedToData.pincode} onChange={handleInputChange} />
                <Input name='mobile' className="sm:w-[280px] w-full" type="text" placeholder="Mobile" value={billedToData.mobile} onChange={handleInputChange} />
                <Input name='mobile2' className="sm:w-[280px] w-full" type="text" placeholder="Mobile 2" value={billedToData.mobile2} onChange={handleInputChange} />
              </div>
              <div className="flex flex-col gap-4 flex-wrap">
                <div className="font-medium">
                  From
                </div>
                <Input name='name' className="sm:w-[280px] w-full" type="text" placeholder="Name" value={fromData.name} onChange={handleFromInputChange} />
                <Input name='addressLine1' className="sm:w-[400px] w-full" type="text" placeholder="Address line 1" value={fromData.addressLine1} onChange={handleFromInputChange} />
                <Input name='addressLine2' className="sm:w-[400px] w-full" type="text" placeholder="Address line 2" value={fromData.addressLine2} onChange={handleFromInputChange} />
                <Input name='city' className="sm:w-[280px] w-full" type="text" placeholder="City" value={fromData.city} onChange={handleFromInputChange} />
                <Input name='state' className="sm:w-[280px] w-full" type="text" placeholder="State" value={fromData.state} onChange={handleFromInputChange} />
                <Input name='pincode' className="sm:w-[280px] w-full" type="text" placeholder="Pincode" value={fromData.pincode} onChange={handleFromInputChange} />
                <Input name='mobile' className="sm:w-[280px] w-full" type="text" placeholder="Mobile" value={fromData.mobile} onChange={handleFromInputChange} />
                <Input name='mobile2' className="sm:w-[280px] w-full" type="text" placeholder="Mobile 2" value={fromData.mobile2} onChange={handleFromInputChange} />
              </div>
            </div>
            <InputTable getTableData={getTableData} />
            <Button className="w-full sm:w-[200px] self-end" type='submit' >Generate Invoice</Button>
          </div>
        </form>
      </div>
    </main>
  )
}