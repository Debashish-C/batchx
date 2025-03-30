import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CreateBatch from "@/ui/batch";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <CreateBatch />
    </div>
  );
}
