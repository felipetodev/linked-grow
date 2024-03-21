import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "./ui/button"
import { IconSettings } from "@tabler/icons-react"

export async function Dialog() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="size-9 p-0 flex">
          <IconSettings />
        </Button>
      </SheetTrigger>
      <SheetContent side='left'>
        <SheetHeader>
          <SheetTitle>More Options</SheetTitle>
          <SheetDescription>
            Configure your settings
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          Drawer Options
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
