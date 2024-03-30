import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet"

type Props = {
  children: React.ReactNode
}

const PostEditDrawer = React.forwardRef<HTMLButtonElement, Props>(({ children }, ref) => {
  return (
    <Sheet>
      <SheetTrigger asChild ref={ref}>
        {children}
      </SheetTrigger>
      <SheetContent className="!max-w-full">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Escribe tu post
          </h3>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input readOnly id="name" value="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input readOnly id="username" value="@peduarte" className="col-span-3" />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
})

PostEditDrawer.displayName = "PostEditDrawer"

export { PostEditDrawer }
