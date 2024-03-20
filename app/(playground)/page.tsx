import { Button } from "@/components/ui/button";
import { IconGhost } from "@tabler/icons-react";

export default function Home() {
  return (
    <main className="h-screen w-full grid place-items-center overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px] duration-300 ease-in-out">
      <div className="grid place-items-center mb-20">
        <IconGhost size={150} />
        <h1 className="text-6xl font-bold">
          SaaS UI
        </h1>
      </div>
    </main>
  );
}
