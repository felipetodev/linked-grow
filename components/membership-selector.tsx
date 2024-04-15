"use client"

import * as React from "react"
import Image from "next/image";
import { IconCheck, IconSelector } from "@tabler/icons-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type Membership = {
  identifier: string
  firstName: string
  lastName: string
  imageUrl: string
  hasImage: boolean
  userId: string
}

export function MembershipSelector({ userId, members }: { userId: string, members: string }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(userId)

  const membersArr: Membership[] = JSON.parse(members)
  const activeUser = membersArr.find((m) => m.userId === value)

  return (
    <div className="ml-auto mr-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="px-2 justify-normal gap-x-2"
          >
            {activeUser?.imageUrl && (
              <Image
                src={activeUser?.imageUrl!}
                alt={activeUser?.firstName!}
                height={25}
                width={25}
                className="rounded-full"
              />
            )}
            <IconSelector className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandGroup>
                {membersArr.map((m) => (
                  <CommandItem
                    key={m.userId}
                    value={m.userId}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                    className="cursor-pointer"
                  >
                    {m?.imageUrl && (
                      <Image
                        src={m.imageUrl}
                        alt={m.firstName}
                        height={30}
                        width={30}
                        className="rounded-full mr-2"
                      />
                    )}
                    <span className="text-sm font-medium truncate">
                      {m.firstName} {m.lastName ? m.lastName : ""}
                    </span>
                    <IconCheck
                      className={cn(
                        "ml-auto h-4 w-4 text-purple-500",
                        value === m.userId ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
