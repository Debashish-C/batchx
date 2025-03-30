import prisma from "@/lib/prisma";
import User from "@/ui/user/User";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function page() {
  let session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email || " ",
    },
  });
  const batch = await prisma.batchUser.findMany({
    where: {
      userId: user?.id,
    },
  });
  return (
    <div className=" w-full flex flex-col justify-center gap-4 items-center">
      <User />
      <div className="sm:w-2xl w-5/6 pt-4 shadow-sm shadow-black flex border-1 rounded-md border-black p-4  justify-start gap-4 items-center">
        <Link
          href="/create"
          className="p-2 pl-3 pr-3  border-1 rounded-md border-black"
        >
          Create Batch
        </Link>
        <Link
          href="/Join"
          className="  p-2 pl-3 pr-3 rounded-md bg-black text-white font-bold border-1 border-black"
        >
          Join Batch
        </Link>
      </div>
      <div className="sm:w-2xl w-5/6 border-1 flex flex-col gap-4 p-3  rounded-md border-black shadow-sm shadow-black">
        <h1 className="">Your Batches</h1>
        {batch.map((batch) => (
          <Link
            key={batch.batchId}
            href={`/ ${batch.batchId}`}
            className="w-full p-2 border-1 border-blue-900 rounded-md shadow-sm shadow-black "
          >
            {batch.batchId}
          </Link>
        ))}
      </div>
    </div>
  );
}
