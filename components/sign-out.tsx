"use client";

import { useClerk } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DropdownMenuItem, DropdownMenuShortcut } from "./ui/dropdown-menu";

export function SignOut() {
  const [isLoading, setLoading] = useState(false);
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    setLoading(true);
    signOut();
    router.refresh();
  };

  return (
    <DropdownMenuItem onClick={handleSignOut}>
      {isLoading ? "Loading..." : "Cerrar sesión"}
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  );
}
