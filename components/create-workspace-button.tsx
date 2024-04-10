"use client"

import * as React from "react"
import { IconCheck, IconCirclePlus, IconSelector } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  Command,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CommandList } from "cmdk"
import { useAuth, useOrganization, useOrganizationList } from "@clerk/nextjs"

export function CreateWorkspaceButton({ membership }: { membership: any }) {
  const [open, setOpen] = React.useState(false)

  const { organization } = useOrganization();
  const { setActive, isLoaded } = useOrganizationList();
  const { orgId: hasActiveWorkspace } = useAuth();

  const firstOrgId = Object.keys(membership ?? {})?.[0];

  React.useEffect(() => {
    if (!isLoaded) return;

    if (!hasActiveWorkspace && firstOrgId) {
      void setActive({ organization: firstOrgId });
    }
  }, [isLoaded, setActive, hasActiveWorkspace, firstOrgId]);

  const handleCreateWorkspace = () => {
    console.log("Create workspace")
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {organization?.name
            ? <span className="truncate">{organization.name}</span>
            : "Felipe Ossandón"}
          <IconSelector className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[80px] p-2">
        <Command>
          <CommandList>
            <div className="relative flex items-center rounded-sm px-2 py-1.5 text-xs opacity-70">
              Workspaces
            </div>
            {hasActiveWorkspace ? (
              <div
                aria-selected
                className="relative flex items-center rounded-sm px-2 py-1.5 aria-selected:bg-accent aria-selected:text-accent-foreground"
              >
                <span className="truncate">
                  {organization?.name}
                </span>
                <IconCheck className="ml-auto h-4 w-4" />
              </div>
            ) : (
              <Button
                variant="ghost"
                className="px-1.5 w-full justify-normal"
                onClick={handleCreateWorkspace}
              >
                <IconCirclePlus className="mr-2" />
                Add a new workspace
              </Button>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
