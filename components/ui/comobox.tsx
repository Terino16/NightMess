import * as React from "react";
import {
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  HelpCircle,
  LucideIcon,
  XCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Option = {
  value: string;
  label: string;
  icon?: LucideIcon;
};

type ComboboxPopoverProps = {
  label: string;
  options: Option[];
  selected: Option | null;
  setSelected: React.Dispatch<React.SetStateAction<Option | null>>;
};

export function ComboboxPopover({ label, options, selected, setSelected }: ComboboxPopoverProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex items-center space-x-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-[150px] justify-start"
          >
            {selected ? (
              <>
                {selected.icon && <selected.icon className="mr-2 h-4 w-4 shrink-0" />}
                {selected.label}
              </>
            ) : (
              <>+ Set {label}</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder={`Change ${label}...`} />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(value) => {
                      setSelected(options.find((opt) => opt.value === value) || null);
                      setOpen(false);
                    }}
                  >
                    {option.icon && (
                      <option.icon
                        className={cn(
                          "mr-2 h-4 w-4",
                          option.value === selected?.value
                            ? "opacity-100"
                            : "opacity-40"
                        )}
                      />
                    )}
                    <span>{option.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
