import { Suspense } from "react";
import Link from "next/link";
import { currentUser, SignInButton } from '@clerk/nextjs';
import { UserMenu } from "./user-menu";
import { Button } from "./ui/button";
import { WorkspaceNav } from "./workspace-nav";
import { AppIcon, HeaderDivider } from "./ui/icons";

export async function Header() {
  const user = await currentUser() ?? undefined;

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center">
        <Link href='/' className="items-baseline font-bold space-x-2 hidden sm:flex">
          <AppIcon />
          <h1 className="text-2xl">
            LinkedGrow
          </h1>
        </Link>
        {user && (
          <>
            <HeaderDivider />
            <Suspense fallback={<></>}>
              <WorkspaceNav />
            </Suspense>
          </>
        )}
      </div>
      <div className="flex items-center justify-end space-x-2">
        {!user ? (
          <SignInButton mode="modal">
            <Button size="sm" variant="secondary">
              Sign In
            </Button>
          </SignInButton>
        ) : (
          <UserMenu user={user} />
        )}
      </div>
    </header>
  )
}
