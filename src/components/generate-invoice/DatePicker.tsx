"use client"

import * as React from "react"
// import { FC } from 'react'
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  content: string,
  date: any
}

export const DatePicker: React.FC<DatePickerProps> = ({content, date}) => {
  const [pickedDate, setPickedDate] = React.useState<Date>()
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !pickedDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {pickedDate ? format(pickedDate, "PPP") : <span>{ content }</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={pickedDate}
          onSelect={setPickedDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
