import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { ThemeSwitch } from "./theme-switch";
import { SignOut } from "./sign-out";
import { type User } from "@clerk/nextjs/server";

export async function UserMenu({ user }: { user: User }) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="rounded-full w-8 h-8 cursor-pointer">
          <AvatarImage src={user.imageUrl} alt={user.firstName ?? 'user'} />
          <AvatarFallback>
            <span className="text-xs">
              {user.firstName?.charAt(0)?.toUpperCase()}
            </span>
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[240px]" sideOffset={10} align="end">
        {user && (
          <>
            <DropdownMenuLabel>
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="truncate">{user.firstName + ' ' + user.lastName}</span>
                  <span className="truncate text-xs opacity-60 font-normal max-w-[20ch]">
                    {user?.emailAddresses[0].emailAddress}
                  </span>
                </div>
                <div className="border py-0.5 px-3 rounded-full text-[11px] font-normal">
                  Beta
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <Link href="/account">
                <DropdownMenuItem>
                  Cuenta
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <div className="flex flex-row justify-between items-center p-2">
              <p className="text-sm">Tema</p>
              <ThemeSwitch />
            </div>
            {/* <DropdownMenuSeparator /> */}
          </>
        )}

        <DropdownMenuSeparator />

        <SignOut />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
