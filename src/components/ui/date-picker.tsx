import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form"

type DatePickerProps<T extends FieldValues> = {
  field: ControllerRenderProps<T, Path<T>>
  label?: string
  description?: string
  minDate?: Date
  maxDate?: Date
}

export const DatePicker = <T extends FieldValues>({
  field,
  label = "Select Date",
  description,
  minDate = new Date("1900-01-01"),
  maxDate = new Date(),
}: DatePickerProps<T>) => {
  return (
    <FormItem className="flex flex-col">
      {label && <FormLabel>{label}</FormLabel>}
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              className={cn(
                "w-[240px] pl-3 text-left font-normal",
                !field.value && "text-muted-foreground"
              )}
            >
              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={field.onChange}
            disabled={(date) => date > maxDate || date < minDate}
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  )
}
