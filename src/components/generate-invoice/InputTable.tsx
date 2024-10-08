'use client'
import { FC, useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'

interface InputTableProps {
  getTableData?: any
}

const InputTable: FC<InputTableProps> = ({ getTableData }) => {
  const [rows, setRows] = useState([{
    description: '',
    planType: '',
    quantity: '',
    amount: '',
  }])

  useEffect(() => {
    getTableData(rows)
  }, [rows])

  const addRow = () => {
    const lastRow = rows[rows.length - 1]

    if (lastRow.description !== '' && lastRow.planType !== '' && lastRow.quantity !== '' && lastRow.amount !== '') {
      setRows([...rows, {
        description: '',
        planType: '',
        quantity: '',
        amount: '',
      }
      ])
    }
  }

  const handleInputChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    const dataKey = Number(event.currentTarget.getAttribute('data-key'));

    setRows((prevFormData) => (
      prevFormData.map((row, index) => {
        if (index === dataKey) {
          return {
            ...row,
            [name]: value,
          }
        } else {
          return row
        }
      })
    ));
  }

  return (
    <div>
      {/* <Separator /> */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Description</TableHead>
            <TableHead>Plan Type</TableHead>
            <TableHead className="sm:w-[200px]">Quantity</TableHead>
            <TableHead className="sm:w-[200px] text-right">Net Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            rows.map((row, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className="">
                    <Input
                      data-key={index}
                      className="w-full"
                      name='description'
                      type="text"
                      placeholder="Description"
                      value={rows[index].description}
                      onChange={handleInputChange} />
                  </TableCell>
                  <TableCell>
                    <Input
                      data-key={index}
                      className="w-full"
                      name='planType'
                      type="text"
                      placeholder="Plan Type"
                      value={rows[index].planType}
                      onChange={handleInputChange} />
                  </TableCell>
                  <TableCell>
                    <Input
                      data-key={index}
                      className="w-full"
                      name='quantity'
                      type="text"
                      placeholder="Quantity"
                      value={rows[index].quantity}
                      onChange={handleInputChange} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Input
                      data-key={index}
                      className="w-full text-right"
                      name='amount'
                      type="text"
                      placeholder="Net Amount"
                      value={rows[index].amount}
                      onChange={handleInputChange} />
                  </TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
      <Separator />
      <Button className="w-full" variant="ghost" type="button" onClick={addRow}>Add Row</Button>
      <Separator />
    </div>
  )
}

export default InputTable