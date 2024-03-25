import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { IconBrandGithub } from '@tabler/icons-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <Link href='/' className="flex items-center font-bold">
        LinkedGrow AI ✨
      </Link>
      <div className="flex items-center justify-end space-x-2">
        <a
          target="_blank"
          href="https://github.com/felipetodev/saas-cn-template"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: 'outline' }))}
        >
          <IconBrandGithub />
          <span className="hidden ml-2 md:flex">GitHub</span>
        </a>
      </div>
    </header>
  )
}

