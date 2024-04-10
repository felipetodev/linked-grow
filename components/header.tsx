import { Suspense } from "react";
import Link from "next/link";
import { currentUser, SignInButton } from '@clerk/nextjs';
import { UserMenu } from "./user-menu";
import { Button } from "./ui/button";
import { WorkspaceNav } from "./workspace-nav";
import { AppIcon } from "./ui/icons";

export async function Header() {
  const user = await currentUser() ?? undefined;

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <Link href='/' className="flex items-baseline font-bold space-x-2">
        <AppIcon />
        <h1 className="text-2xl">
          LinkedGrow
        </h1>
      </Link>
      <div className="flex items-center justify-end space-x-2">
        {!user ? (
          <SignInButton mode="modal">
            <Button size="sm" variant="secondary">
              Sign In
            </Button>
          </SignInButton>
        ) : (
          <>
            <Suspense fallback={<></>}>
              <WorkspaceNav />
            </Suspense>
            <UserMenu user={user} />
          </>
        )}
      </div>
    </header>
  )
}
