import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface List {
    value: string;
    label: string;
}

interface ComboBoxProps {
    value: string;
    setValue: (value: string) => void;
    list: List[];
    text: string;
}

export function ComboBoxItem({value, setValue, list, text}: ComboBoxProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? list.find((name) => name.value === value)?.label
            : text}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={`${text}...`} className="h-9" />
          <CommandList>
            <CommandEmpty>{`${text} no encontrado`}</CommandEmpty>
            <CommandGroup>
              {list.map((name) => (
                <CommandItem
                  key={name.value}
                  value={name.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {name.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === name.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
