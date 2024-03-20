import { Dialog } from "./dialog";
import { Sidebar } from "./sidebar";
import { SidebarToggle } from "./sidebar-toggle";

export async function SidebarDesktop() {
  return (
    <Sidebar className="peer absolute inset-y-0 z-30 -translate-x-full border-r bg-muted duration-300 ease-in-out data-[state=open]:translate-x-0 flex lg:w-[250px] xl:w-[300px]">
      <aside className="px-4 py-1">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">
            Acme Workspace ✨
          </h2>
          <Dialog />
        </div>
      </aside>
      <div className="absolute top-1 -right-11">
        <SidebarToggle />
      </div>
    </Sidebar>
  )
}
