"use client"

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Cards } from "./cards"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { createUrl } from "@/lib/utils";

export function PostsCards() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams.get("status")) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("status", "draft");

      router.push(createUrl('/posts', params));
    }
  }, [router, searchParams])

  return (
    <Tabs
      defaultValue={searchParams.get("status") || "draft"}
      onValueChange={value => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("status", value);

        router.push(createUrl('/posts', params));
      }}
    >
      <TabsList className="mb-4">
        <TabsTrigger value="draft">Borradores</TabsTrigger>
        <TabsTrigger value="published">Publicados</TabsTrigger>
        <TabsTrigger value="scheduled" disabled>
          Programados
        </TabsTrigger>
      </TabsList>
      <TabsContent value="draft">
        <Cards status="draft" />
      </TabsContent>
      <TabsContent value="published">
        <Cards status="published" />
      </TabsContent>
      <TabsContent value="scheduled">
        Soon
      </TabsContent>
    </Tabs>
  )
}
